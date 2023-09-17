import {
    Button,
    Center,
    Group,
    NumberInput,
    SegmentedControl,
    Switch,
    Text,
    TextInput,
} from "@mantine/core"
import { DatePickerInput } from "@mantine/dates"
import { useForm, zodResolver } from "@mantine/form"
import { Prisma } from "@prisma/client"
import {
    IconArrowLeft,
    IconCheckbox,
    IconPlayerSkipForward,
    IconTrashX,
} from "@tabler/icons-react"
import dayjs from "dayjs"
import duration from "dayjs/plugin/duration"
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next"
import Head from "next/head"
import { useRouter } from "next/router"
import toast from "react-hot-toast"
import LoginHeader from "~/components/Header"
import { LoadingPage } from "~/components/LoadingSpinner"
import { PageLayout } from "~/components/layout"
import { getServerAuthSession } from "~/server/auth"
import { createSSRHelpers } from "~/server/utils"
import { api } from "~/utils/api"
import {
    CreateChoreFormValues,
    CreateChoreSubmitValues,
    createChoreSchema,
} from "./createChore"
import { modals } from "@mantine/modals"
dayjs.extend(duration)

const ChoreDetailsView = (
    props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
    const { choreId } = props
    const { data: chore, isLoading } = api.chores.getById.useQuery({ choreId })

    if (isLoading) return <LoadingPage />
    if (!chore) return "Chore not found"

    return <ChoreDetailsViewInner chore={chore} />
}

const minutesInDay = 1440
const minutesInWeek = minutesInDay * 7
const possibleMinutesInMonth = [
    28 * minutesInDay,
    29 * minutesInDay,
    30 * minutesInDay,
    31 * minutesInDay,
]

// TODO: Maybe just store the unit alongside the minutes...
const getUnitFromIntervalInMinutes = (
    repeatIntervalMinutes: number
): "days" | "weeks" | "months" => {
    for (const minutesInMonth of possibleMinutesInMonth) {
        if (repeatIntervalMinutes % minutesInMonth === 0) {
            return "months"
        }
    }

    if (repeatIntervalMinutes % minutesInWeek === 0) {
        return "weeks"
    }

    return "days"
}

const getRepeatIntervalNumber = (
    repeatIntervalMinutes: number,
    repeatIntervalUnit: "days" | "weeks" | "months"
) => {
    switch (repeatIntervalUnit) {
        case "days":
            return repeatIntervalMinutes / minutesInDay
        case "weeks":
            return repeatIntervalMinutes / minutesInWeek
        case "months":
            return repeatIntervalMinutes / (30 * minutesInDay)
    }
}

const ChoreDetailsViewInner = ({
    chore,
}: {
    chore: Prisma.ChoreGetPayload<{}>
}) => {
    const router = useRouter()
    const ctx = api.useContext()

    const { mutate: updateChore, isLoading } = api.chores.update.useMutation({
        onSuccess: () => {
            toast(`Chore '${form.values.name}' updated!`)
            void ctx.chores.getById.invalidate()
            setTimeout(() => router.push("/chores"), 1000)
        },
        onError: (err: any) => {
            console.error(err)
            toast.error(`Failed to update chore, please try again!`)
        },
    })

    const { mutate: deleteChore, isLoading: isDeleteLoading } =
        api.chores.delete.useMutation({
            onSuccess: () => {
                toast(`Chore '${form.values.name}' deleted!`)
                void ctx.chores.getById.invalidate()
                router.push("/chores")
            },
            onError: (err: any) => {
                console.error(err)
                toast.error(`Failed to delete chore, please try again!`)
            },
        })

    const repeatIntervalUnit = getUnitFromIntervalInMinutes(
        chore.repeatIntervalMinutes
    )
    const repeatIntervalNumber = getRepeatIntervalNumber(
        chore.repeatIntervalMinutes,
        repeatIntervalUnit
    )
    const form = useForm<CreateChoreFormValues>({
        initialValues: {
            name: `${chore.name}`,
            description: `${chore.description}`,
            points: chore.points,
            shouldRepeat: chore.shouldRepeat,
            deadline: chore.deadline,
            repeatIntervalNumber,
            repeatIntervalUnit,
        },

        validate: zodResolver(createChoreSchema),
    })

    const shortChoreName =
        chore.name.length > 14
            ? chore.name.substring(0, 10) + "..."
            : chore.name
    const openDeleteModal = () =>
        modals.openConfirmModal({
            title: `Delete '${chore.name}'?`,
            labels: {
                confirm: `Delete '${shortChoreName}'`,
                cancel: "Cancel",
            },
            confirmProps: { color: "red" },
            onConfirm: async () => await deleteChore({ id: chore.id }),
            centered: true,
        })

    const submitForm = () => {
        form.validate()

        if (form.isValid()) {
            const formValues = createChoreSchema.parse(form.values)
            const submitValues: CreateChoreSubmitValues = {
                name: formValues.name,
                description: formValues.description,
                points: formValues.points,
                deadline: formValues.deadline,
                shouldRepeat: formValues.shouldRepeat,
                repeatIntervalMinutes: 3600,
            }

            if (formValues.shouldRepeat) {
                const repeatIntervalMinutes = dayjs
                    .duration(
                        formValues.repeatIntervalNumber,
                        formValues.repeatIntervalUnit
                    )
                    .asMinutes()

                submitValues.repeatIntervalMinutes = repeatIntervalMinutes
            }

            updateChore({ ...submitValues, id: chore.id })
        }
    }

    if (!chore) return <div>404</div>

    return (
        <>
            <Head>
                <title>{chore.name} - Home Owl</title>
            </Head>

            <PageLayout>
                <LoginHeader />
                <Center className="border-b border-slate-400 p-4">
                    <Text fz={"32px"} fw={"700"}>
                        {chore.name}
                    </Text>
                </Center>

                <Button
                    p={"5px"}
                    w={"80px"}
                    color="teal"
                    variant="subtle"
                    leftIcon={<IconArrowLeft />}
                    onClick={() => router.push("/chores")}
                >
                    Back
                </Button>

                <Center mt={"xl"}>
                    <form style={{ width: "400px" }}>
                        <TextInput
                            withAsterisk
                            label="Name"
                            placeholder="Vacuum living room"
                            {...form.getInputProps("name")}
                        />
                        <TextInput
                            label="Description"
                            placeholder="Use vacuum cleaner to remove dust from the floor"
                            mt="sm"
                            {...form.getInputProps("description")}
                        />
                        <NumberInput
                            withAsterisk
                            label="Points"
                            placeholder=""
                            mt="sm"
                            w={"50%"}
                            {...form.getInputProps("points")}
                        />
                        <DatePickerInput
                            withAsterisk
                            mt="sm"
                            label="Deadline"
                            placeholder="Pick deadline"
                            {...form.getInputProps("deadline")}
                        />

                        <Text className="border-b" mt="xl">
                            Repeat interval
                        </Text>

                        <Switch
                            label="Repeat every"
                            color="lime"
                            mt="md"
                            {...form.getInputProps("shouldRepeat", {
                                type: "checkbox",
                            })}
                        />

                        <Group position="apart">
                            <Center w={"30%"}>
                                <NumberInput
                                    disabled={!form.values.shouldRepeat}
                                    withAsterisk
                                    placeholder=""
                                    mt="sm"
                                    {...form.getInputProps(
                                        "repeatIntervalNumber"
                                    )}
                                />
                            </Center>

                            <Center w={"65%"}>
                                <SegmentedControl
                                    disabled={!form.values.shouldRepeat}
                                    color="lime"
                                    mt="sm"
                                    data={[
                                        { label: "Days", value: "days" },
                                        { label: "Weeks", value: "weeks" },
                                        { label: "Months", value: "months" },
                                    ]}
                                    value={form.values.repeatIntervalUnit}
                                    onChange={(value) =>
                                        form.setFieldValue(
                                            "repeatIntervalUnit",
                                            value
                                        )
                                    }
                                />
                            </Center>
                        </Group>

                        <Center>
                            <Button
                                onClick={submitForm}
                                mt={"xl"}
                                variant="gradient"
                                gradient={{
                                    from: "teal",
                                    to: "lime",
                                    deg: 60,
                                }}
                                loading={isLoading}
                            >
                                Update Chore
                            </Button>
                        </Center>
                    </form>
                </Center>

                <Center className="mt-8 border-y border-slate-400 p-4">
                    <Group spacing="xl">
                        <Button
                            variant="gradient"
                            gradient={{
                                from: "green",
                                to: "teal",
                                deg: 60,
                            }}
                            leftIcon={<IconCheckbox />}
                        >
                            Custom Completion
                        </Button>
                        <Button
                            variant="gradient"
                            gradient={{
                                from: "yellow",
                                to: "orange",
                                deg: 60,
                            }}
                            leftIcon={<IconPlayerSkipForward />}
                        >
                            Skip
                        </Button>
                        <Button
                            onClick={openDeleteModal}
                            variant="gradient"
                            gradient={{
                                from: "red",
                                to: "pink",
                                deg: 60,
                            }}
                            leftIcon={<IconTrashX />}
                            loading={isDeleteLoading}
                        >
                            Delete
                        </Button>
                    </Group>
                </Center>
            </PageLayout>
        </>
    )
}

// Grab props serverside so that chore is available already when the page loads on the client
// Must be exported to work!
export const getServerSideProps = async (
    ctx: GetServerSidePropsContext<{ choreId: string }>
) => {
    // TODO: Somehow session is null and we're getting UNAUTHORIZED when prefetching :(
    const session = await getServerAuthSession(ctx)
    const helpers = createSSRHelpers()

    const choreId = ctx.params?.choreId
    if (typeof choreId !== "string") throw new Error("no slug")

    await helpers.chores.getById.prefetch({ choreId })

    return {
        props: {
            session,
            trpcState: helpers.dehydrate(),
            choreId,
        },
    }
}

export default ChoreDetailsView
