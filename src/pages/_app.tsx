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

// TODOdin: Ok maybe this just doesn't work.. What if we don't use next? :(
// The goal is to package a server-side rendered Next.js app as SPA for capacitor.  (not even for any intentional SSR, it just seems that trpc(?) still fetches from /_next/data which uses localhost as baseurl in capacitor)
// Src: https://gist.github.com/fgnass/e4d3435bf3face47a9deb9cd3a8ba21f
const patchFetchForCapacitorWithSSR = () => {
    if (
        typeof window !== "undefined" &&
        (window.origin === "https://localhost" ||
            window.origin === "capacitor://")
    ) {
        const _fetch = window.fetch
        window.fetch = (res, init) => {
            if (
                typeof res === "string" &&
                (res.startsWith("/_next/data") || res.startsWith("/_next/api"))
            ) {
                // TODOdin: Use vercel url env or something rather than hardcoding
                res = "https://home-owl.odin-matthias.de" + res
            }
            return _fetch(res, init)
        }
    }
}

const MyApp: AppType<{ session: Session | null }> = ({
    Component,
    pageProps: { session, ...pageProps },
}) => {
    patchFetchForCapacitorWithSSR()

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
