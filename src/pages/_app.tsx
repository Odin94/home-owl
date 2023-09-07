import { ClerkProvider } from "@clerk/nextjs"
import { type Session } from "next-auth"
import { SessionProvider } from "next-auth/react"
import { type AppType } from "next/app"
import Head from "next/head"
import { Toaster } from "react-hot-toast"
import "~/styles/globals.css"
import { api } from "~/utils/api"

const MyApp: AppType<{ session: Session | null }> = ({
    Component,
    pageProps: { session, ...pageProps },
}) => {
    return (
        <SessionProvider session={session}>
            <ClerkProvider {...pageProps}>
                <Head>
                    <title>Home Owl</title>
                    <meta
                        name="description"
                        content="Keep a watchful eye on your chores!"
                    />
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <Toaster position="bottom-center" />
                <Component {...pageProps} />
            </ClerkProvider>
        </SessionProvider>
    )
}

export default api.withTRPC(MyApp)
