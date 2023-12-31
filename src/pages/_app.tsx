import { ClerkProvider } from "@clerk/nextjs"
import { MantineProvider } from "@mantine/core"
import { ModalsProvider } from "@mantine/modals"
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

                <MantineProvider
                    withGlobalStyles
                    withNormalizeCSS
                    theme={{
                        /** Put your mantine theme override here */
                        colorScheme: "light",
                    }}
                >
                    <ModalsProvider>
                        <Component {...pageProps} />
                    </ModalsProvider>
                </MantineProvider>
            </ClerkProvider>
        </SessionProvider>
    )
}

export default api.withTRPC(MyApp)
