import {
    Button,
    Center,
    Group,
    NumberInput,
    SegmentedControl,
    Space,
    Switch,
    Text,
    TextInput,
} from "@mantine/core"
import { DateInput, DatePickerInput, DateValue } from "@mantine/dates"
import { useForm, zodResolver } from "@mantine/form"
import { useDisclosure } from "@mantine/hooks"
import { modals } from "@mantine/modals"
import {
    IconArrowLeft,
    IconCheckbox,
    IconPlayerSkipForward,
    IconTrashX,
} from "@tabler/icons-react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import {
    Link,
    createFileRoute,
    useNavigate,
    useParams,
} from "@tanstack/react-router"
import dayjs from "dayjs"
import duration from "dayjs/plugin/duration"
import { Helmet } from "react-helmet"
import toast from "react-hot-toast"
import CustomCompletionModal from "~/components/CustomCompletionModal"
import LoginHeader from "~/components/Header"
import { LoadingPage } from "~/components/LoadingSpinner"
import { PageLayout } from "~/components/layout"
import {
    fetchDeleteChore,
    fetchGetChore,
    fetchUpdateChore,
} from "~/utils/queries"
import { Chore, CreateChoreSubmitValues } from "~/utils/types"
import { getNextDeadline } from "~/utils/utils"
import { useCompleteChore } from "../../utils/hooks"
import { CreateChoreFormValues, createChoreSchema } from "./createChore"
dayjs.extend(duration)

export const Route = createFileRoute("/chores/$choreId")({
    component: ChoreDetailsView,
})

function ChoreDetailsView() {
    let { choreId } = useParams({ strict: false })
    const navigate = useNavigate()

    // TODO: Fix next no longer hot-reloading; is it launching the static thingy with npm start now?
    // TODO: Fix typing for choreId, current handling is very inelegant
    if (typeof choreId !== "string") choreId = ""

    const {
        data: chore,
        isPending,
        error,
    } = useQuery({
        queryFn: async () => fetchGetChore(choreId),
        queryKey: ["chores", choreId],
    })

    if (error?.message?.includes("UNAUTHORIZED")) {
        console.log("Not logged in, navigating to /")
        navigate({ to: "/" })
        return
    }

    if (isPending)
        return (
            <PageLayout>
                <LoginHeader />
                <LoadingPage />
            </PageLayout>
        )

    if (!chore)
        return (
            <PageLayout>
                <LoginHeader />
                <div>Chore not found</div>
            </PageLayout>
        )

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
    repeatIntervalMinutes: number,
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
    repeatIntervalUnit: "days" | "weeks" | "months",
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

const ChoreDetailsViewInner = ({ chore }: { chore: Chore }) => {
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const [
        customCompletionModalOpened,
        { open: openCustomCompletionModal, close: closeCustomCompletionModal },
    ] = useDisclosure(false)
    const { completeChore, isLoading: isCompleteLoading } = useCompleteChore(
        chore,
        closeCustomCompletionModal,
    )

    const { mutate: updateChore, isPending: isUpdateLoading } = useMutation({
        mutationFn: fetchUpdateChore,
        onSuccess: (_data, { id }) => {
            toast(`Chore '${form.values.name}' updated!`)
            queryClient.invalidateQueries({ queryKey: ["chores", id] })

            setTimeout(() => navigate({ to: "/chores" }), 1000)
        },
        onError: (err: any) => {
            console.error(err)
            toast.error(`Failed to update chore, please try again!`)
        },
    })

    const { mutate: deleteChore, isPending: isDeleteLoading } = useMutation({
        mutationFn: fetchDeleteChore,
        onSuccess: (_data, id) => {
            toast(`Chore '${form.values.name}' deleted!`)
            queryClient.invalidateQueries({ queryKey: ["chores", id] })
            navigate({ to: "/chores" })
        },
        onError: (err: any) => {
            console.error(err)
            toast.error(`Failed to delete chore, please try again!`)
        },
    })

    const repeatIntervalUnit = getUnitFromIntervalInMinutes(
        chore.repeatIntervalMinutes,
    )
    const repeatIntervalNumber = getRepeatIntervalNumber(
        chore.repeatIntervalMinutes,
        repeatIntervalUnit,
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

    const skipTo = async (date: DateValue) => {
        if (date) await updateChore({ ...chore, deadline: date })
        console.log(date)
        modals.closeAll()
    }
    const completeOn = async (date: DateValue) => {
        // TODO: Add loading spinner while completion is in flight and only close modal after success
        if (date) await completeChore({ choreId: chore.id, completedAt: date })
        console.log(date)
        // modals.closeAll()
    }

    const openDeleteModal = () =>
        modals.openConfirmModal({
            title: `Delete '${chore.name}'?`,
            labels: {
                confirm: `Delete '${shortChoreName}'`,
                cancel: "Cancel",
            },
            confirmProps: { color: "red" },
            onConfirm: async () => await deleteChore(chore.id),
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
                        formValues.repeatIntervalUnit,
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
            <Helmet>
                <title>{chore.name} - Home Owl</title>
            </Helmet>

            <CustomCompletionModal
                chore={chore}
                completeOn={completeOn}
                opened={customCompletionModalOpened}
                close={closeCustomCompletionModal}
                isLoading={isCompleteLoading}
            />

            <PageLayout>
                <LoginHeader />
                <Center className="border-b border-slate-400 p-4">
                    <Text fz={"32px"} fw={"700"}>
                        {chore.name}
                    </Text>
                </Center>

                <div className="p-2">
                    <Link to={"/chores"}>
                        <Button
                            p={"5px"}
                            w={"80px"}
                            color="teal"
                            variant="subtle"
                            leftSection={<IconArrowLeft />}
                        >
                            Back
                        </Button>
                    </Link>
                </div>

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

                        <Group justify="apart">
                            <Center w={"30%"}>
                                <NumberInput
                                    disabled={!form.values.shouldRepeat}
                                    withAsterisk
                                    placeholder=""
                                    mt="sm"
                                    {...form.getInputProps(
                                        "repeatIntervalNumber",
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
                                            value,
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
                                loading={isUpdateLoading}
                            >
                                Update Chore
                            </Button>
                        </Center>
                    </form>
                </Center>

                <Center className="mt-8 border-y border-slate-400 p-4">
                    <Group gap="xl">
                        <Button
                            onClick={() => openCustomCompletionModal()}
                            variant="gradient"
                            gradient={{
                                from: "green",
                                to: "teal",
                                deg: 60,
                            }}
                            leftSection={<IconCheckbox />}
                        >
                            Custom Completion
                        </Button>
                        <Button
                            onClick={() => openSkipModal(chore, skipTo)}
                            variant="gradient"
                            gradient={{
                                from: "yellow",
                                to: "orange",
                                deg: 60,
                            }}
                            leftSection={<IconPlayerSkipForward />}
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
                            leftSection={<IconTrashX />}
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

// TODO: Align this with CustomCompletionModal?
const openSkipModal = (
    chore: Chore,
    skipTo: (date: DateValue) => Promise<void>,
) => {
    let skipDate: DateValue = chore.deadline
    modals.open({
        title: `Skip '${chore.name}' to`,
        children: (
            <>
                <Space h="xl" />
                <DateInput
                    // Can't use controlled value here because modal doesn't update with re-renders
                    defaultValue={skipDate}
                    onChange={(value) => {
                        skipDate = value
                    }}
                    mb={"350px"}
                    label="Skip to"
                    data-autofocus
                />
                <Group my={"xl"} justify="center" grow>
                    <Button
                        onClick={() => skipTo(new Date())}
                        color="yellow"
                        variant="outline"
                    >
                        Skip to today
                    </Button>
                    <Button
                        onClick={() => {
                            const newDeadline = getNextDeadline(
                                chore.deadline,
                                chore.repeatIntervalMinutes,
                            )
                            skipTo(newDeadline)
                        }}
                        color="orange"
                        variant="outline"
                    >
                        Skip to next
                    </Button>
                </Group>
                <Space h="xs" />
                <Button
                    fullWidth
                    onClick={() => {
                        console.log(skipDate)
                        skipTo(skipDate)
                    }}
                    variant="gradient"
                    gradient={{
                        from: "yellow",
                        to: "orange",
                        deg: 60,
                    }}
                >
                    Skip
                </Button>
            </>
        ),
        centered: true,
    })
}

export default ChoreDetailsView
