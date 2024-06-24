import {
    Button,
    CloseButton,
    Collapse,
    Grid,
    Group,
    Loader,
    Paper,
    Stack,
    Text,
    Title,
} from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { modals } from "@mantine/modals"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createFileRoute, useNavigate } from "@tanstack/react-router"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import { motion } from "framer-motion"
import { Helmet } from "react-helmet"
import toast from "react-hot-toast"
import LoginHeader from "~/components/Header"
import { LoadingPage } from "~/components/LoadingSpinner"
import UserView from "~/components/UserView"
import { PageLayout } from "~/components/layout"
import {
    fetchDeleteChoreCompletion,
    fetchGetMyUser,
    fetchGetUsersWithChoreCompletionsInMyHome,
} from "~/utils/queries"
import { ChoreCompletion, UserWithChoreCompletions } from "~/utils/types"

dayjs.extend(relativeTime)

export const Route = createFileRoute("/users/")({
    component: UsersView,
})

function UsersView() {
    const navigate = useNavigate()

    const {
        data: usersWithChoreCompletions,
        isPending,
        error,
    } = useQuery({
        queryFn: fetchGetUsersWithChoreCompletionsInMyHome,
        queryKey: ["usersInMyHome"],
    })

    if (isPending)
        return (
            <PageLayout>
                <LoginHeader />
                <LoadingPage />
            </PageLayout>
        )
    if (error?.message?.includes("UNAUTHORIZED")) {
        console.log("Not logged in, navigating to /")
        navigate({ to: "/" })
        return
    }
    if (!usersWithChoreCompletions) {
        console.log(error)
        return (
            <PageLayout>
                <LoginHeader />
                <div>Failed to load: {error?.message}</div>
            </PageLayout>
        )
    }

    return (
        <>
            <Helmet>
                <title>Users - Home Owl</title>
            </Helmet>

            <PageLayout>
                <LoginHeader />

                {usersWithChoreCompletions
                    .sort((a, b) => b.points - a.points)
                    .map((user) => {
                        return (
                            <div key={user.id}>
                                <UserView user={user}>
                                    <Title>{`${user.points} pts`}</Title>
                                </UserView>

                                <CompletedChoresView user={user} />
                            </div>
                        )
                    })}
            </PageLayout>
        </>
    )
}

const CompletedChoresView = ({ user }: { user: UserWithChoreCompletions }) => {
    const [opened, { toggle }] = useDisclosure(false)

    const completionsSortedByRecency = user.choreCompletions.sort(
        (a: any, b: any) =>
            dayjs(b.completedAt).isBefore(dayjs(a.completedAt)) ? -1 : 1,
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
                                key={choreCompletion?.id}
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
                            {tail.map((choreCompletion: ChoreCompletion) => {
                                return (
                                    <CompletedChoreView
                                        key={choreCompletion?.id}
                                        choreCompletion={choreCompletion}
                                    />
                                )
                            })}
                        </Grid.Col>
                    </Grid>
                </Collapse>
            )}

            <Group justify="center" mb={25} mt={15}>
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
    const queryClient = useQueryClient()

    const { data: me } = useQuery({
        queryFn: fetchGetMyUser,
        queryKey: ["me"],
    })
    const choreName = choreCompletion.choreName ?? ""
    const shortChoreName =
        choreName.length > 14 ? choreName.substring(0, 10) + "..." : choreName

    const { mutate: deleteChoreCompletion, isPending } = useMutation({
        mutationFn: fetchDeleteChoreCompletion,
        onSuccess: () => {
            toast(`Deleted completion of ${shortChoreName}!`)
            // TODOdin: This may lead to re-loading a lot of data - maybe load less data and only invalidate what you need to invalidate?
            queryClient.invalidateQueries({ queryKey: ["usersInMyHome"] })
        },
        onError: (err) => {
            console.log(err)
            toast.error(
                `Failed to delete completion of ${shortChoreName}. Please try again!`,
            )
        },
    })

    const openDeleteModal = () =>
        modals.openConfirmModal({
            title: `Undo completion of '${choreCompletion.choreName}'?`,
            labels: {
                confirm: `Undo completion of '${shortChoreName}'`,
                cancel: "Cancel",
            },
            confirmProps: { color: "red" },
            onConfirm: async () =>
                await deleteChoreCompletion(choreCompletion.id),
            centered: true,
        })

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
                    <Group gap="40px" className="flex">
                        <Stack gap="0px" className="flex-grow">
                            {/* TODO: Adjust maw based on screen size */}
                            <Group justify="apart">
                                <Title lineClamp={1} order={4} maw={"500px"}>
                                    {choreCompletion.choreName}
                                </Title>
                                {/* Only show delete button for own completions */}
                                <div
                                    style={{
                                        visibility:
                                            choreCompletion.completedByUserId ===
                                            me?.id
                                                ? "visible"
                                                : "hidden",
                                    }}
                                >
                                    {isPending ? (
                                        <Loader color="gray" size="xs" />
                                    ) : (
                                        <CloseButton
                                            onClick={openDeleteModal}
                                        />
                                    )}
                                </div>
                            </Group>

                            <Group justify="apart">
                                <Text c="green">
                                    {`Completed ${dayjs(
                                        choreCompletion.completedAt,
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
