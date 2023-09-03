import { createServerSideHelpers } from '@trpc/react-query/server';
import Head from 'next/head';
import Image from "next/image";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next/types';
import superjson from "superjson";
import { PageLayout } from '~/components/layout';
import { appRouter } from '~/server/api/root';
import { prisma } from '~/server/db';
import { api } from "~/utils/api";


const ProfilePage = (props: InferGetServerSidePropsType<typeof getServerSideProps>,) => {
    const { username } = props

    const { data } = api.profile.getUserByUsername.useQuery({
        username,
    });
    if (!data) return <div>404</div>;

    return (
        <>
            <Head>
                <title>{data.name} - Home Owl</title>
            </Head>
            <PageLayout>
                <div className='h-36 bg-slate-600 relative'>
                    <Image
                        src={data.imageUrl}
                        alt={`${data.name ?? "user"}'s profile pic`}
                        width={128}
                        height={128}
                        className='-mb-[64px] absolute bottom-0 left-0 ml-4 rounded-full border-2 border-black bg-black'
                    />
                </div>
                <div className='h-[64px]'></div>
                <div className='p-4 text-2xl font-bold'>{`${data.name ?? ""}`}</div>
                <div className='border-b border-slate-400 w-full' />
            </PageLayout>
        </>
    );
}

// Grab props serverside so that profile is available already when the page loads on the client
export const getServerSideProps = async (context: GetServerSidePropsContext<{ slug: string }>) => {
    const helpers = createServerSideHelpers({
        router: appRouter,
        ctx: { prisma, userId: null },
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