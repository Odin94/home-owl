import Head from "next/head"
import { GetServerSidePropsContext } from "next/types"
import PostView from "~/components/PostView"
import { PageLayout } from "~/components/layout"
import { createSSRHelpers } from "~/server/utils"
import { api } from "~/utils/api"

const SinglePostPage = (
    props: any //InferGetServerSidePropsType<typeof getServerSideProps>
) => {
    const { postId } = props

    const { data } = api.posts.getById.useQuery({ postId })
    if (!data) throw new Error("omg no data")
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
    console.error("SERVER SIDING")

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
