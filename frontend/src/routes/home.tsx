import { useUser } from "@clerk/clerk-react"
import { Button, Center, Stack, Text } from "@mantine/core"
import {
    QueryClient,
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query"
import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { useState } from "react"
import { Helmet } from "react-helmet"
import toast from "react-hot-toast"
import LoginHeader from "~/components/Header"
import {
    CeneteredLoadingSpinner,
    LoadingPage,
} from "~/components/LoadingSpinner"
import UserView from "~/components/UserView"
import { PageLayout } from "~/components/layout"
import {
    fetchAddUserToHome,
    fetchCreateHome,
    fetchGetMyHome,
} from "~/utils/queries"
import { HomeWithUsers } from "~/utils/types"
import "~/styles/globals.css"

export const Route = createFileRoute("/home")({
    component: HomeView,
})

const ExistingHomeView = ({ home }: { home: HomeWithUsers }) => {
    return (
        <div>
            {home.users.map((user) => (
                <UserView key={user.id} user={user} />
            ))}

            <div className="flex p-4">
                <AddUserToHomeWizard />
            </div>
        </div>
    )
}

const CreateHomeWizard = () => {
    const queryClient = useQueryClient()

    const { mutate, isPending: isPosting } = useMutation({
        mutationFn: fetchCreateHome,
        onSuccess: () => {
            toast.success("Home created!")
            queryClient.invalidateQueries({ queryKey: ["myHome"] })
        },
        onError: (err: any) => {
            const errorMessage = err.data?.zodError?.fieldErrors?.content
            console.log(err)
            if (errorMessage) {
                toast.error(errorMessage[0])
            } else {
                toast.error("Failed to create home! Please try again.")
            }
        },
    })

    return (
        <div>
            <Center>
                <Stack fz={"xl"} ta={"center"} w={"100%"} p={"lg"}>
                    <Text>You're not currently a member of a home.</Text>
                    <Text>
                        You can either wait for somebody to add you to their
                        home or create your own.
                    </Text>

                    {!isPosting ? (
                        <Button onClick={() => mutate()} className="">
                            Create Home
                        </Button>
                    ) : (
                        <CeneteredLoadingSpinner size={20} />
                    )}
                </Stack>
            </Center>
        </div>
    )
}

const AddUserToHomeWizard = () => {
    const { user } = useUser()
    const queryClient = useQueryClient()

    const [input, setInput] = useState("")

    const { mutate: addUserToMyHome, isPending: isPosting } = useMutation({
        mutationFn: fetchAddUserToHome,
        onSuccess: () => {
            setInput("")
            queryClient.invalidateQueries({ queryKey: ["myHome"] })
            // void ctx.home.getMyHomeWithClerk.invalidate()
            toast("User added successfully!")
        },
        onError: (err: any) => {
            const errorMessage = err.data?.zodError?.fieldErrors?.content
            console.log(err)
            if (errorMessage) {
                toast.error(errorMessage[0])
            } else {
                toast.error("Failed to add user! Please try again.")
            }
        },
    })

    if (!user) return null

    return (
        <div className="flex h-9 w-full gap-3">
            <input
                type="text"
                placeholder="Type exact username to add to home"
                className="grow border border-slate-400 bg-transparent outline-none"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isPosting}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        e.preventDefault()
                        if (input !== "") {
                            void addUserToMyHome(input)
                        }
                    }
                }}
            />

            {!isPosting ? (
                <div style={{ width: "30%" }}>
                    <Button
                        onClick={() => addUserToMyHome(input)}
                        disabled={isPosting || input === ""}
                        className=""
                    >
                        Add user to my home
                    </Button>
                </div>
            ) : (
                <div style={{ width: "30%" }}>
                    <CeneteredLoadingSpinner size={20} />
                </div>
            )}
        </div>
    )
}

function HomeView() {
    const navigate = useNavigate()
    const { isLoaded: isUserLoaded, isSignedIn } = useUser()

    const {
        data: home,
        isLoading: isHomeLoading,
        error,
    } = useQuery({
        queryKey: ["myHome"],
        queryFn: fetchGetMyHome,
    })

    if (isHomeLoading || !isUserLoaded)
        return (
            <PageLayout>
                <LoginHeader />
                <LoadingPage />
            </PageLayout>
        )
    if (error && !error.message.includes("NOT FOUND"))
        return (
            <PageLayout>
                <LoginHeader />
                <div>Error: {error.message}</div>
            </PageLayout>
        )

    if (!isSignedIn) {
        console.log("Not logged in, navigating to /")
        navigate({ to: "/" })
        return
    }

    return (
        <>
            <Helmet>
                <title>Home - Home Owl</title>
            </Helmet>

            <PageLayout>
                <LoginHeader />
                {/* <Center className="border-b border-slate-400 p-4">
                    <Text fz={"32px"} fw={"700"}>
                        Home
                    </Text>
                </Center> */}

                <div>
                    {home ? (
                        <ExistingHomeView home={home} />
                    ) : (
                        <CreateHomeWizard />
                    )}
                </div>
            </PageLayout>
        </>
    )
}
