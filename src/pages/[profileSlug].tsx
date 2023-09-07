import Head from "next/head"
import Image from "next/image"
import {
    GetServerSidePropsContext,
    InferGetServerSidePropsType,
} from "next/types"
import { LoadingPage } from "~/components/LoadingSpinner"
import PostView from "~/components/PostView"
import { PageLayout } from "~/components/layout"
import { createSSRHelpers } from "~/server/utils"
import { api } from "~/utils/api"

const ProfileFeed = (props: { userId: string }) => {
    const { data, isLoading } = api.posts.getByUserId.useQuery({
        userId: props.userId,
    })

    if (isLoading) return <LoadingPage />
    if (!data || data.length === 0) return <div>User has not posted</div>

    return (
        <div className="flex flex-col">
            {data.map((postWithAuthor) => (
                <PostView {...postWithAuthor} key={postWithAuthor.post.id} />
            ))}
        </div>
    )
}

const ProfilePage = (
    props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
    const { username } = props

    const { data } = api.profile.getUserByUsername.useQuery({
        username,
    })
    if (!data) return <div>404</div>

    return (
        <>
            <Head>
                <title>{`${data.name} - Home Owl`}</title>
            </Head>
            <PageLayout>
                <div className="relative h-36 bg-slate-600">
                    <Image
                        src={data.imageUrl}
                        alt={`${data.name ?? "user"}'s profile pic`}
                        width={128}
                        height={128}
                        className="absolute bottom-0 left-0 -mb-[64px] ml-4 rounded-full border-2 border-black bg-black"
                    />
                </div>
                <div className="h-[64px]"></div>
                <div className="p-4 text-2xl font-bold">{`${
                    data.name ?? ""
                }`}</div>
                <div className="w-full border-b border-slate-400" />

                <ProfileFeed userId={data.id} />
            </PageLayout>
        </>
    )
}

// Grab props serverside so that profile is available already when the page loads on the client
export const getServerSideProps = async (
    context: GetServerSidePropsContext<{ profileSlug: string }>
) => {
    const helpers = createSSRHelpers()

    const slug = context.params?.profileSlug
    if (typeof slug !== "string") throw new Error("no slug")
    const username = slug.replace("@", "")

    await helpers.profile.getUserByUsername.prefetch({ username })

    return {
        props: {
            trpcState: helpers.dehydrate(),
            username,
        },
    }
}

export default ProfilePage
