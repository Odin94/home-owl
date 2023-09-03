import { createServerSideHelpers } from '@trpc/react-query/server';
import Head from "next/head";
import { LoadingPage } from "~/components/LoadingSpinner";
import { appRouter } from '~/server/api/root';
import { prisma } from '~/server/db';
import { api } from "~/utils/api";
import superjson from "superjson";
import { GetServerSidePropsContext, GetStaticProps, InferGetServerSidePropsType, NextPage } from 'next/types';


const ProfilePage = (props: InferGetServerSidePropsType<typeof getServerSideProps>,) => {
    const { username } = props

    const { data } = api.profile.getUserByUsername.useQuery({
        username,
    });
    if (!data) return <div>404</div>;

    return (
        <>
            {/* <Head>
                <title></title>
            </Head> */}
            <main className="flex justify-center h-screen">
                <div>{data?.name}</div>
            </main>
        </>
    );
}

// Grab props serverside so that profile is available already when the page loads on the client
export const getServerSideProps = async (context: GetServerSidePropsContext<{ slug: string }>) => {
    const helpers = createServerSideHelpers({
        router: appRouter,
        ctx: { prisma, session: null },
        transformer: superjson,
    })

    const slug = context.params?.slug
    if (typeof slug !== "string") throw new Error("no slug")
    const username = slug.replace("@", "")

    await helpers.profile.getUserByUsername.prefetch({ username })

    return {
        props: {
            trpcState: helpers.dehydrate(),
            username,
        }
    }
}


export default ProfilePage