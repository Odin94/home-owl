import { SignInButton, SignOutButton, useUser } from "@clerk/clerk-react"
import { Button, Group, Stack, Tabs } from "@mantine/core"
import { IconHome, IconSettings, IconUsers } from "@tabler/icons-react"
import { useEffect, useState } from "react"
import { Link } from "@tanstack/react-router"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { fetchCreateUser, fetchGetMyUser } from "~/utils/queries"

const LoginHeader = () => {
    const { isLoaded: isClerkUserLoaded, isSignedIn } = useUser()

    const queryClient = useQueryClient()

    const { data: prismaUser, isLoading: isPrismaUserLoading } = useQuery({
        // TODO: Should prismaUser and other fetchGetMyuser be different?
        queryKey: ["prismaUser"],
        queryFn: async () => fetchGetMyUser,
    })

    const { mutate: createPrismaUser } = useMutation({
        mutationFn: fetchCreateUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["prismaUser"] })
        },
        onError: (err: any) => {
            console.log({ err })
        },
    })

    // If we do have a clerk user, but no prisma user -> create prisma user
    useEffect(() => {
        if (
            isClerkUserLoaded &&
            isSignedIn &&
            !isPrismaUserLoading &&
            !prismaUser
        ) {
            createPrismaUser()
        }
    }, [
        isClerkUserLoaded,
        isSignedIn,
        isPrismaUserLoading,
        prismaUser,
        createPrismaUser,
    ])

    const location =
        typeof window !== "undefined" ? window.location.pathname : ""
    const [activeTab, setActiveTab] = useState<string | null>(location)

    return (
        <div style={{ height: "120px", width: "100%" }} className="flex p-4">
            <Stack style={{ width: "100%" }}>
                <Group justify="flex-end">
                    <ClerkAuthButton isSignedIn={!!isSignedIn} />
                </Group>
                <Tabs
                    value={activeTab}
                    onChange={setActiveTab}
                    w={"100%"}
                    color="teal"
                >
                    <Tabs.List grow>
                        <Tabs.Tab
                            fz={"lg"}
                            value="/home"
                            leftSection={<IconHome size="1.0rem" />}
                        >
                            <Link to="/home">Home</Link>
                        </Tabs.Tab>
                        <Tabs.Tab
                            fz={"lg"}
                            value="/chores"
                            leftSection={<IconSettings size="1.0rem" />}
                        >
                            <Link to="/chores">Chores</Link>
                        </Tabs.Tab>
                        <Tabs.Tab
                            fz={"lg"}
                            value="/users"
                            leftSection={<IconUsers size="1.0rem" />}
                        >
                            <Link to="/users">Users</Link>
                        </Tabs.Tab>
                    </Tabs.List>
                </Tabs>
            </Stack>
        </div>
    )
}

const ClerkAuthButton = ({ isSignedIn }: { isSignedIn: boolean }) => {
    return (
        <>
            {isSignedIn ? (
                <div className="flex justify-center">
                    <SignOutButton redirectUrl="/">
                        <Button
                            size="xs"
                            radius="xl"
                            variant="subtle"
                            color="yellow"
                        >
                            Sign out
                        </Button>
                    </SignOutButton>
                </div>
            ) : (
                <SignInButton forceRedirectUrl="/chores">
                    <Button
                        size="xs"
                        radius="xl"
                        variant="gradient"
                        gradient={{
                            from: "teal",
                            to: "lime",
                            deg: 60,
                        }}
                    >
                        Sign in
                    </Button>
                </SignInButton>
            )}
        </>
    )
}

export default LoginHeader
