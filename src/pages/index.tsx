import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs"
import { Button } from "@mantine/core"
import { signIn, signOut, useSession } from "next-auth/react"
import Head from "next/head"
import Image from "next/image"
import { useRouter } from "next/router"
import { useState } from "react"
import toast from "react-hot-toast"
import { CeneteredLoadingSpinner } from "~/components/LoadingSpinner"
import PostView from "~/components/PostView"
import { PageLayout } from "~/components/layout"
import { api } from "~/utils/api"

const CreatePostWizard = () => {
    const { user } = useUser()

    const [input, setInput] = useState("")

    const ctx = api.useContext()

    const { mutate, isLoading: isPosting } = api.posts.create.useMutation({
        onSuccess: () => {
            setInput("")
            void ctx.posts.getAll.invalidate()
        },
        onError: (err: any) => {
            const errorMessage = err.data?.zodError?.fieldErrors?.content
            console.log(err)
            if (errorMessage) {
                toast.error(errorMessage[0])
            } else {
                toast.error("Failed to post! Please try again.")
            }
        },
    })

    if (!user) return null

    return (
        <div className="flex w-full gap-3">
            <Image
                src={user.imageUrl}
                alt="user profile image"
                width={56}
                height={56}
                className="rounded-full"
            />

            <input
                type="text"
                placeholder="Type something funny!"
                className="grow bg-transparent outline-none"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isPosting}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        e.preventDefault()
                        if (input !== "") {
                            void mutate({ content: input })
                        }
                    }
                }}
            />

            {input !== "" && !isPosting ? (
                <button onClick={() => mutate({ content: input })} className="">
                    Post
                </button>
            ) : null}

            {isPosting ? <CeneteredLoadingSpinner size={20} /> : null}
        </div>
    )
}

const Feed = () => {
    const { data, isLoading } = api.posts.getAll.useQuery()

    if (isLoading) return <CeneteredLoadingSpinner size={45} />

    if (!data) return <div>Something went wrong</div>

    return (
        <div className="flex h-full flex-col">
            {data.map((postWithAuthor) => (
                <PostView key={postWithAuthor.post.id} {...postWithAuthor} />
            ))}
        </div>
    )
}

export default function Home() {
    const router = useRouter()
    const { isLoaded: userLoaded, isSignedIn } = useUser()

    // Start fetching asap (used in Feed component, but already starting to fetch here)
    api.posts.getAll.useQuery()

    if (!userLoaded) return <div />

    return (
        <>
            <Head>
                <title>Home Owl</title>
                <meta
                    name="description"
                    content="Keep a watchful eye on your chores!"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <PageLayout>
                <div className="flex border-b border-slate-400 p-4">
                    {isSignedIn ? (
                        <div className="flex justify-center">
                            <CreatePostWizard />
                            <SignOutButton />
                        </div>
                    ) : (
                        <SignInButton />
                    )}
                </div>
                <Button onClick={() => router.push("/chores")}>
                    To Chores
                </Button>
                <Feed />
            </PageLayout>
        </>
    )
}

function AuthShowcase() {
    const { data: sessionData } = useSession()

    // const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    //   undefined, // no input
    //   { enabled: sessionData?.user !== undefined }
    // );

    return (
        <div className="flex flex-col items-center justify-center gap-4">
            <p className="text-center text-2xl text-white">
                {sessionData && (
                    <span>Logged in as {sessionData.user?.name}</span>
                )}
                {/* {secretMessage && <span> - {secretMessage}</span>} */}
            </p>
            <button
                className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
                onClick={
                    sessionData ? () => void signOut() : () => void signIn()
                }
            >
                {sessionData ? "Sign out" : "Sign in"}
            </button>
        </div>
    )
}
