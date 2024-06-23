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
import { IconCheck, IconPlus } from "@tabler/icons-react"
import dayjs from "dayjs"
import localeData from "dayjs/plugin/localeData"
import relativeTime from "dayjs/plugin/relativeTime"
import weekday from "dayjs/plugin/weekday"
import { motion } from "framer-motion"
import LoginHeader from "~/components/Header"
import { LoadingPage } from "~/components/LoadingSpinner"
import { PageLayout } from "~/components/layout"
import { useCompleteChore } from "../../utils/hooks"
import { Helmet } from "react-helmet"
import { createFileRoute, useNavigate, Link } from "@tanstack/react-router"
import { Chore } from "~/utils/types"
import { useQuery } from "@tanstack/react-query"
import { fetchGetMyChores } from "~/queries"

dayjs.extend(localeData)
dayjs.extend(weekday)
dayjs.extend(relativeTime)

const completableChoreVariants = {
    normal: { backgroundColor: "white" },
    completed: {
        backgroundColor: ["#FFF", "#C0EB75"],
        opacity: 0,
        transition: {
            duration: 1,
            ease: "easeOut",
        },
    },
}

export const Route = createFileRoute("/chores/")({
    component: CompletableChoreView,
})

function CompletableChoreView({ chore }: { chore: Chore }) {
    const navigate = useNavigate()

    const now = dayjs()
    const deadline = dayjs(chore.deadline)
    const isOverdue = deadline.isBefore(now, "day")
    const isToday = deadline.isSame(now, "day")

    const { completeChore, isLoading, isCompleted, setIsCompleted } =
        useCompleteChore(chore)

    return (
        <motion.div
            onClick={() => {
                navigate({ to: `/chores/${chore.id}` })
            }}
            style={{ y: 20, opacity: 0 }}
            animate={{
                y: 0,
                opacity: 1,
                transition: {
                    duration: 0.5,
                },
            }}
        >
            <motion.div whileHover={{ scale: 1.01 }}>
                <Paper
                    shadow="xs"
                    p="xs"
                    m="5px"
                    component={motion.div}
                    animate={isCompleted ? "completed" : "normal"}
                    variants={completableChoreVariants}
                    onAnimationComplete={() => {
                        setIsCompleted(false)
                        // void ctx.chores.getMyChores.invalidate()
                    }}
                >
                    <Group gap="40px" className="flex">
                        <ActionIcon
                            onClick={(e) => {
                                e.preventDefault()
                                e.stopPropagation()
                                completeChore({ choreId: chore.id })
                            }}
                            size="xl"
                            variant="light"
                            radius="xl"
                            color="lime"
                            loading={isLoading}
                        >
                            <IconCheck size="1.75rem" />
                        </ActionIcon>
                        <Stack gap="0px" className="flex-grow">
                            {/* TODO: Adjust maw based on screen size */}
                            <Title lineClamp={1} order={4} maw={"500px"}>
                                {chore.name}
                            </Title>
                            <Text maw={"500px"} truncate>
                                {chore.description}
                            </Text>

                            <Group justify="apart">
                                <Text c={isOverdue ? "red" : "black"}>
                                    {!isOverdue && !isToday
                                        ? dayjs().localeData().weekdays()[
                                              deadline.weekday()
                                          ]
                                        : null}{" "}
                                    {isToday ? "Today" : deadline.fromNow()}
                                </Text>
                                <Text c={"gray"}>{chore.points}pts</Text>
                            </Group>
                        </Stack>
                    </Group>
                </Paper>
            </motion.div>
        </motion.div>
    )
}

const ChoresView = () => {
    const navigate = useNavigate()

    const {
        data: chores,
        isPending: isChoresLoading,
        error,
    } = useQuery({
        queryFn: fetchGetMyChores,
        queryKey: ["chores"],
    })

    if (isChoresLoading)
        return (
            <PageLayout>
                <LoginHeader />
                <LoadingPage />
            </PageLayout>
        )

    if (error?.message?.includes("UNAUTHORIZED")) {
        console.log("Not logged in, navigating to /")
        navigate({ to: "/" })
    }
    if (error)
        return (
            <PageLayout>
                <LoginHeader />
                <div>
                    Error: {error.message} with {JSON.stringify(error)}
                </div>
            </PageLayout>
        )
    if (!chores)
        return (
            <PageLayout>
                <LoginHeader />
                <div>
                    Error: Failed to load chores from{" "}
                    {"TODO put router basepath here I guess"}
                </div>
            </PageLayout>
        )

    const now = dayjs()
    const openChores = chores.filter(
        (chore) =>
            dayjs(chore.deadline).isBefore(now, "day") ||
            dayjs(chore.deadline).isSame(now, "day"),
    )
    const futureChores = chores.filter((chore) =>
        dayjs(chore.deadline).isAfter(now, "day"),
    )

    return (
        <>
            <Helmet>
                <title>Chores - Home Owl</title>
            </Helmet>

            <PageLayout>
                <LoginHeader />
                {/* <Center className="border-b border-slate-400 p-4">
                    <Text fz={"32px"} fw={"700"}>
                        Chores
                    </Text>
                </Center> */}

                {chores.length > 0 ? (
                    // TODO: Add scrolling for large number of chores?
                    <div>
                        {openChores.length > 0 ? (
                            <Text mt={"xl"}>Open chores</Text>
                        ) : null}
                        {openChores.map((chore) => (
                            <CompletableChoreView chore={chore} />
                        ))}
                        {futureChores.length > 0 ? (
                            <Text mt={"xl"}>Upcoming chores</Text>
                        ) : null}
                        {futureChores.map((chore) => (
                            <CompletableChoreView chore={chore} />
                        ))}
                    </div>
                ) : (
                    <Center h={"40%"} ta={"center"}>
                        <Stack gap="xs">
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
                    <Group justify="right" pr={"40px"}>
                        <Link to={"/chores/createChore"}>
                            <Button
                                leftSection={<IconPlus />}
                                radius="xl"
                                variant="gradient"
                                gradient={{ from: "teal", to: "lime", deg: 60 }}
                            >
                                Add Chore
                            </Button>
                        </Link>
                    </Group>
                </div>
            </PageLayout>
        </>
    )
}

export default motion(ChoresView)
