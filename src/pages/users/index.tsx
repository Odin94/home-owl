import {
    Button,
    Center,
    Collapse,
    Grid,
    Group,
    Paper,
    Stack,
    Text,
    Title,
} from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { ChoreCompletion, User } from "@prisma/client"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import { motion } from "framer-motion"
import Head from "next/head"
import LoginHeader from "~/components/Header"
import { LoadingPage } from "~/components/LoadingSpinner"
import UserView from "~/components/UserView"
import { PageLayout } from "~/components/layout"
import { api } from "~/utils/api"
import { UserWithChoreCompletions } from "~/utils/types"
dayjs.extend(relativeTime)

const UsersView = () => {
    const {
        data: usersWithChoreCompletions,
        isLoading,
        error,
    } = api.home.getUsersWithChoreCompletionsInMyHome.useQuery()

    if (isLoading) return <LoadingPage />
    if (!usersWithChoreCompletions) {
        console.log(error)
        return <div>Error: Failed to load</div>
    }

    return (
        <>
            <Head>
                <title>Users - Home Owl</title>
            </Head>

            <PageLayout>
                <LoginHeader />
                <Center className="border-b border-slate-400 p-4">
                    <Text fz={"32px"} fw={"700"}>
                        Users
                    </Text>
                </Center>

                {usersWithChoreCompletions
                    .sort((a, b) => b.points - a.points)
                    .map((user) => {
                        return (
                            <>
                                <UserView user={user}>
                                    <Title>{`${user.points} pts`}</Title>
                                </UserView>

                                <CompletedChoresView user={user} />
                            </>
                        )
                    })}
            </PageLayout>
        </>
    )
}

const CompletedChoresView = ({ user }: { user: UserWithChoreCompletions }) => {
    const [opened, { toggle }] = useDisclosure(false)

    const completionsSortedByRecency = user.choreCompletions.sort((a, b) =>
        dayjs(b.completedAt).isBefore(dayjs(a.completedAt)) ? -1 : 1
    )
    const [first, second, third, ...tail] = completionsSortedByRecency
    const firstSet = [first, second, third].filter((x) => !!x)

    return (
        <div className="border-b border-slate-400">
            <Grid>
                <Grid.Col offset={1} span={11}>
                    {firstSet.map((choreCompletion) => {
                        return (
                            <CompletedChoreView
                                choreCompletion={choreCompletion!}
                            />
                        )
                    })}
                </Grid.Col>
            </Grid>
            {tail.length === 0 ? null : (
                <Collapse in={opened}>
                    <Grid>
                        <Grid.Col offset={1} span={11}>
                            {tail.map((choreCompletion) => {
                                return (
                                    <CompletedChoreView
                                        choreCompletion={choreCompletion}
                                    />
                                )
                            })}
                        </Grid.Col>
                    </Grid>
                </Collapse>
            )}

            <Group position="center" mb={25} mt={15}>
                <Button
                    onClick={toggle}
                    radius="xl"
                    variant="gradient"
                    gradient={{ from: "teal", to: "lime", deg: 60 }}
                >
                    {opened ? "Hide" : "Show all"}
                </Button>
            </Group>
        </div>
    )
}

const CompletedChoreView = ({
    choreCompletion,
}: {
    choreCompletion: ChoreCompletion
}) => {
    return (
        <motion.div
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
                <Paper shadow="xs" p="xs" m="5px">
                    <Group spacing="40px" className="flex">
                        <Stack spacing="0px" className="flex-grow">
                            {/* TODO: Adjust maw based on screen size */}
                            <Title truncate order={4} maw={"500px"}>
                                {choreCompletion.choreName}
                            </Title>

                            <Group position="apart">
                                <Text color="green">
                                    {`Completed ${dayjs(
                                        choreCompletion.completedAt
                                    ).fromNow()}`}
                                </Text>
                                <Text c={"gray"}>
                                    {choreCompletion.points}pts
                                </Text>
                            </Group>
                        </Stack>
                    </Group>
                </Paper>
            </motion.div>
        </motion.div>
    )
}

export default UsersView
