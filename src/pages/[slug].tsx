import { SignIn, SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import Head from "next/head";
import { api } from "~/utils/api";




export default function ProfilePage() {
    const { isLoaded: userLoaded, isSignedIn } = useUser();

    // Start fetching asap (used in Feed component, but already starting to fetch here)
    api.posts.getAllWithAuthor.useQuery();

    if (!userLoaded) return <div />;

    return (
        <>
            <Head>
                <title>Home Owl</title>
                <meta name="description" content="Keep a watchful eye on your chores!" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="flex justify-center h-screen">
                <div>User Page</div>
            </main>
        </>
    );
}
