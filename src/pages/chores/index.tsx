import { Button, Center, Group, Paper, Stack, Text, Title } from "@mantine/core"
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

dayjs.extend(localeData)
dayjs.extend(weekday)
dayjs.extend(relativeTime)

const CompletableChoreView = ({ chore }: { chore: Chore }) => {
    const now = dayjs()
    const deadline = dayjs(chore.deadline)
    const isOverdue = deadline.isBefore(now)
    // TODO: Add mutation for adding new completion & updating user score

    return (
        <Paper shadow="xs" p="xs" m="5px">
            <Group spacing="40px" className="flex">
                <Button
                    className="h-12 w-12 rounded-full p-2 shadow-md"
                    onClick={() => {
                        /* TODO: mutate here */
                    }}
                    variant="gradient"
                    gradient={{ from: "teal", to: "lime", deg: 60 }}
                >
                    <IconCheck className="h-9 w-9" />
                </Button>
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

    const { data: home, isLoading: isHomeLoading } =
        api.home.getMyHome.useQuery()

    if (isHomeLoading) return <LoadingPage />
    if (!home) return <div>Error: Failed to load home</div>

    const chores = home.chores.sort(
        (a, b) => a.deadline.getTime() - b.deadline.getTime()
    )

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

                {chores.map((chore) => (
                    <CompletableChoreView chore={chore} />
                ))}

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
