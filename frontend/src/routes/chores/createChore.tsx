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
import { IconArrowLeft } from "@tabler/icons-react"
import { useMutation } from "@tanstack/react-query"
import { createFileRoute, Link } from "@tanstack/react-router"
import dayjs from "dayjs"
import duration from "dayjs/plugin/duration"
import { Helmet } from "react-helmet"
import toast from "react-hot-toast"
import { z } from "zod"
import LoginHeader from "~/components/Header"
import { PageLayout } from "~/components/layout"
import { fetchCreateChore } from "~/utils/queries"
import { CreateChoreSubmitValues } from "~/utils/types"

dayjs.extend(duration)

export type CreateChoreFormValues = {
    name: string
    description?: string
    points: number
    deadline: Date
    shouldRepeat: boolean
    repeatIntervalNumber: number
    repeatIntervalUnit: string
}

export const createChoreSchema = z.object({
    name: z.string().min(1),
    description: z.string(),
    points: z.number().int().min(0),
    deadline: z.date(),
    shouldRepeat: z.boolean(),
    repeatIntervalNumber: z.number().int().min(0),
    repeatIntervalUnit: z.union([
        z.literal("days"),
        z.literal("weeks"),
        z.literal("months"),
    ]),
})

export const Route = createFileRoute("/chores/createChore")({
    component: CreateChore,
})

function CreateChore() {
    const { mutate: createChore, isPending } = useMutation({
        mutationFn: fetchCreateChore,
        onSuccess: () => {
            toast(`Chore '${form.values.name}' created!`)
            form.reset()
        },
        onError: (err: any) => {
            console.error(err)
            toast.error(`Failed to create chore, please try again!`)
        },
    })

    const form = useForm<CreateChoreFormValues>({
        initialValues: {
            name: "",
            description: "",
            points: 1,
            shouldRepeat: true,
            deadline: new Date(),
            repeatIntervalNumber: 1,
            repeatIntervalUnit: "days",
        },

        validate: zodResolver(createChoreSchema),
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

            createChore(submitValues)
        }
    }

    return (
        <>
            <Helmet>
                <title>Create Chore - Home Owl</title>
            </Helmet>

            <PageLayout>
                <LoginHeader />
                <Center className="border-b border-slate-400 p-4">
                    <Text fz={"32px"} fw={"700"}>
                        Create Chore
                    </Text>
                </Center>

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
                            color="red"
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
                                    color="teal"
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
                                loading={isPending}
                            >
                                Create Chore
                            </Button>
                        </Center>
                    </form>
                </Center>
            </PageLayout>
        </>
    )
}

export default CreateChore
