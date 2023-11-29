import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs"
import { Button, Group, Stack, Tabs } from "@mantine/core"
import { IconHome, IconSettings, IconUsers } from "@tabler/icons-react"
import { NextRouter, useRouter } from "next/router"
import { useEffect, useState } from "react"
import { api } from "~/utils/api"

const LoginHeader = () => {
    const router = useRouter()
    const ctx = api.useContext()
    const { isLoaded: isClerkUserLoaded, isSignedIn } = useUser()

    const { data: prismaUser, isLoading: isPrismaUserLoading } =
        api.user.getMyUser.useQuery()

    const { mutate: createPrismaUser } = api.user.create.useMutation({
        onSuccess: () => {
            void ctx.user.getMyUser.invalidate()
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
    }, [isClerkUserLoaded, isSignedIn, isPrismaUserLoading, prismaUser])

    const [activeTab, setActiveTab] = useState<string | null>(
        window.location.pathname
    )

    return (
        <div style={{ height: "120px", width: "100%" }} className="flex p-4">
            <Stack style={{ width: "100%" }}>
                <Group position="right">
                    <ClerkAuthButton
                        isSignedIn={!!isSignedIn}
                        router={router}
                    />
                </Group>
                <Tabs
                    value={activeTab}
                    onTabChange={setActiveTab}
                    w={"100%"}
                    color="teal"
                >
                    <Tabs.List grow>
                        <Tabs.Tab
                            fz={"lg"}
                            onClick={() => router.push("/home")}
                            value="/home"
                            icon={<IconHome size="1.0rem" />}
                        >
                            Home
                        </Tabs.Tab>
                        <Tabs.Tab
                            fz={"lg"}
                            onClick={() => router.push("/chores")}
                            value="/chores"
                            icon={<IconSettings size="1.0rem" />}
                        >
                            Chores
                        </Tabs.Tab>
                        <Tabs.Tab
                            fz={"lg"}
                            onClick={() => router.push("/users")}
                            value="/users"
                            icon={<IconUsers size="1.0rem" />}
                        >
                            Users
                        </Tabs.Tab>
                    </Tabs.List>
                </Tabs>
            </Stack>
        </div>
    )
}

const ClerkAuthButton = ({
    isSignedIn,
    router,
}: {
    isSignedIn: boolean
    router: NextRouter
}) => {
    return (
        <>
            {isSignedIn ? (
                <div className="flex justify-center">
                    <SignOutButton
                        signOutCallback={() => {
                            router.push("/")
                        }}
                    >
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
                <SignInButton>
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
