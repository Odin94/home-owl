import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs"
import { Button, Center, Stack, Text } from "@mantine/core"
import { User } from "@prisma/client"
import Head from "next/head"
import Image from "next/image"
import { useState } from "react"
import toast from "react-hot-toast"
import LoginHeader from "~/components/Header"
import {
    CeneteredLoadingSpinner,
    LoadingPage,
} from "~/components/LoadingSpinner"
import { PageLayout } from "~/components/layout"
import { HomeWithUsers } from "~/server/api/routers/homes"
import { api } from "~/utils/api"

const UserView = ({ user }: { user: User }) => {
    return (
        <div className="flex gap-3 border-b border-slate-400 p-4" key={user.id}>
            <Image
                src={user.imageUrl ?? ""}
                width={56}
                height={56}
                className="rounded-full"
                alt="user profile picture"
            />
            <div className="flex flex-col">
                <div className="flex gap-1 text-slate-500">
                    <span>{`${user.name} `}</span>
                </div>
            </div>
        </div>
    )
}

const ExistingHomeView = ({ home }: { home: HomeWithUsers }) => {
    return (
        <div>
            {home.users.map((user) => (
                <UserView user={user} />
            ))}

            <div className="flex p-4">
                <AddUserToHomeWizard />
            </div>
        </div>
    )
}

const CreateHomeWizard = () => {
    const ctx = api.useContext()

    const { mutate, isLoading: isPosting } = api.home.create.useMutation({
        onSuccess: () => {
            toast.success("Home created!")
            void ctx.home.getMyHome.invalidate()
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

    const [input, setInput] = useState("")

    const ctx = api.useContext()

    const { mutate: addUser, isLoading: isPosting } =
        api.home.addUserToMyHome.useMutation({
            onSuccess: () => {
                setInput("")
                void ctx.home.getMyHome.invalidate()
                void ctx.home.getMyHomeWithClerk.invalidate()
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
                            void addUser({ userName: input })
                        }
                    }
                }}
            />

            {!isPosting ? (
                <div style={{ width: "30%" }}>
                    <Button
                        onClick={() => addUser({ userName: input })}
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

export default function HomeView() {
    const { isLoaded: isUserLoaded, isSignedIn } = useUser()

    const { data: home, isLoading: isHomeLoading } =
        api.home.getMyHome.useQuery()

    if (isHomeLoading || !isUserLoaded) return <LoadingPage />

    return (
        <>
            <Head>
                <title>Home - Home Owl</title>
            </Head>

            <PageLayout>
                <LoginHeader />
                <Center className="border-b border-slate-400 p-4">
                    <Text fz={"32px"} fw={"700"}>
                        Home
                    </Text>
                </Center>

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
