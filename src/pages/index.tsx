import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs"
import { Button } from "@mantine/core"
import Head from "next/head"
import { useRouter } from "next/router"
import { PageLayout } from "~/components/layout"

export default function Home() {
    const router = useRouter()
    const { isLoaded: userLoaded, isSignedIn } = useUser()

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
                            <SignOutButton />
                        </div>
                    ) : (
                        <SignInButton />
                    )}
                </div>
                <Button onClick={() => router.push("/chores")}>
                    To Chores
                </Button>
            </PageLayout>
        </>
    )
}
