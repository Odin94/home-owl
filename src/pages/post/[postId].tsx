import Head from "next/head"
import {
    GetServerSidePropsContext,
    InferGetServerSidePropsType,
} from "next/types"
import PostView from "~/components/PostView"
import { PageLayout } from "~/components/layout"
import { createSSRHelpers } from "~/server/utils"
import { api } from "~/utils/api"

const SinglePostPage = (
    props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
    const { postId } = props

    const { data } = api.posts.getById.useQuery({ postId })
    if (!data) return <div>404</div>

    return (
        <>
            <Head>
                <title>{`@${data.author.name} - ${data.post.content}`}</title>
            </Head>
            <PageLayout>
                <PostView {...data} />
            </PageLayout>
        </>
    )
}

// Grab props serverside so that profile is available already when the page loads on the client
export const getServerSideProps = async (
    context: GetServerSidePropsContext<{ postId: string }>
) => {
    const helpers = createSSRHelpers()

    const postId = context.params?.postId
    if (typeof postId !== "string") throw new Error("no slug")

    await helpers.posts.getById.prefetch({ postId })

    return {
        props: {
            trpcState: helpers.dehydrate(),
            postId,
        },
    }
}

export default SinglePostPage
