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
import dayjs from "dayjs"
import duration from "dayjs/plugin/duration"
import Head from "next/head"
import { useRouter } from "next/router"
import toast from "react-hot-toast"
import { z } from "zod"
import LoginHeader from "~/components/Header"
import { PageLayout } from "~/components/layout"
import { createChoreInput } from "~/server/api/routers/chores"
import { api } from "~/utils/api"

dayjs.extend(duration)

type FormValues = {
    name: string
    description?: string
    points: number
    deadline: Date
    shouldRepeat: boolean
    repeatIntervalNumber: number
    repeatIntervalUnit: string
}

type SubmitValues = z.infer<typeof createChoreInput>

const formSchema = z.object({
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

const CreateChoreWizard = () => {
    const router = useRouter()

    const { mutate: createChore } = api.chores.create.useMutation({
        onSuccess: () => {
            toast(`Chore '${form.values.name}' created!`)
            form.reset()
        },
        onError: (err: any) => {
            console.error(err)
            toast.error(`Failed to create chore, please try again!`)
        },
    })

    const form = useForm<FormValues>({
        initialValues: {
            name: "",
            description: "",
            points: 1,
            shouldRepeat: true,
            deadline: new Date(),
            repeatIntervalNumber: 1,
            repeatIntervalUnit: "days",
        },

        validate: zodResolver(formSchema),
    })

    const submitForm = () => {
        form.validate()

        if (form.isValid()) {
            const formValues = formSchema.parse(form.values)
            const submitValues: SubmitValues = {
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

            createChore(submitValues)
        }
    }

    return (
        <>
            <Head>
                <title>Create Chore - Home Owl</title>
            </Head>

            <PageLayout>
                <LoginHeader />
                <Center className="border-b border-slate-400 p-4">
                    <Text fz={"32px"} fw={"700"}>
                        Create Chore
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

export default CreateChoreWizard
