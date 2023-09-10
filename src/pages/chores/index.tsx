import {
    ActionIcon,
    Button,
    Center,
    Group,
    Paper,
    Stack,
    Text,
    Title,
} from "@mantine/core"
import { Chore } from "@prisma/client"
import { IconCheck, IconCircleCheck, IconPlus } from "@tabler/icons-react"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import Head from "next/head"
import { useRouter } from "next/router"
import LoginHeader from "~/components/Header"
import { LoadingPage } from "~/components/LoadingSpinner"
import { PageLayout } from "~/components/layout"
import { api } from "~/utils/api"
import weekday from "dayjs/plugin/weekday"
import localeData from "dayjs/plugin/localeData"
import toast from "react-hot-toast"

dayjs.extend(localeData)
dayjs.extend(weekday)
dayjs.extend(relativeTime)

const CompletableChoreView = ({ chore }: { chore: Chore }) => {
    const ctx = api.useContext()

    const now = dayjs()
    const deadline = dayjs(chore.deadline)
    const isOverdue = deadline.isBefore(now)

    const { mutate: completeChore, isLoading } =
        api.choreCompletions.create.useMutation({
            onSuccess: () => {
                void ctx.chores.getMyChores.invalidate()
                toast(`Completed ${chore.name}!`)
            },
            onError: (err) => {
                console.log(err)
                toast.error(
                    `Failed to complete ${chore.name}. Please try again!`
                )
            },
        })

    return (
        <Paper shadow="xs" p="xs" m="5px">
            <Group spacing="40px" className="flex">
                <ActionIcon
                    onClick={() => completeChore({ choreId: chore.id })}
                    size="xl"
                    variant="light"
                    radius="xl"
                    color="lime"
                    loading={isLoading}
                >
                    <IconCheck size="1.25rem" />
                </ActionIcon>
                <Stack spacing="0px" className="flex-grow">
                    <Title order={4}>{chore.name}</Title>
                    <Text>{chore.description}</Text>

                    <Group position="apart">
                        <Text c={isOverdue ? "red" : "black"}>
                            {!isOverdue
                                ? dayjs().localeData().weekdays()[
                                      deadline.weekday()
                                  ]
                                : null}{" "}
                            {deadline.fromNow()}
                        </Text>
                        <Text c={"gray"}>{chore.points}pts</Text>
                    </Group>
                </Stack>
            </Group>
        </Paper>
    )
}

const ChoresView = () => {
    const router = useRouter()

    const { data: chores, isLoading: isChoresLoading } =
        api.chores.getMyChores.useQuery()

    if (isChoresLoading) return <LoadingPage />
    if (!chores) return <div>Error: Failed to load chores</div>

    return (
        <>
            <Head>
                <title>Chores - Home Owl</title>
            </Head>

            <PageLayout>
                <LoginHeader />
                <Center className="border-b border-slate-400 p-4">
                    <Text fz={"32px"} fw={"700"}>
                        Chores
                    </Text>
                </Center>

                {chores.length > 0 ? (
                    chores.map((chore) => (
                        <CompletableChoreView chore={chore} />
                    ))
                ) : (
                    <Center h={"40%"} ta={"center"}>
                        <Stack spacing="xs">
                            <Text fz={"xl"}>
                                Your home doesn't have any chores yet.
                            </Text>
                            <Text c={"gray"}>
                                Create new chores using the "Add Chore" button
                                below!
                            </Text>
                        </Stack>
                    </Center>
                )}

                <div className="sticky top-[100vh] border-t border-slate-400 p-4">
                    <Group position="right" pr={"40px"}>
                        <Button
                            onClick={() => {
                                router.push("/chores/createChore")
                            }}
                            leftIcon={<IconPlus />}
                            radius="xl"
                            variant="gradient"
                            gradient={{ from: "teal", to: "lime", deg: 60 }}
                        >
                            Add Chore
                        </Button>
                    </Group>
                </div>
            </PageLayout>
        </>
    )
}

export default ChoresView
