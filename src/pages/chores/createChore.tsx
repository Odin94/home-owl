import { Center, Text } from "@mantine/core"
import Head from "next/head"
import { useRouter } from "next/router"
import LoginHeader from "~/components/Header"
import { LoadingPage } from "~/components/LoadingSpinner"
import { PageLayout } from "~/components/layout"
import { api } from "~/utils/api"

const CreateChoreWizard = () => {
    const router = useRouter()

    const { data: home, isLoading: isHomeLoading } =
        api.home.getMyHome.useQuery()

    if (isHomeLoading) return <LoadingPage />
    if (!home) return <div>Error: Failed to load home</div>

    const chores = home.chores.sort(
        (a, b) => a.deadline.getTime() - b.deadline.getTime()
    )

    return (
        <>
            <Head>
                <title>Create Chore - Home Owl</title>
            </Head>

            <PageLayout>
                <LoginHeader />
                <Center className="border-b border-slate-400 p-4">
                    <Text fz={"32px"} fw={"700"}>
                        Create Chore
                    </Text>
                </Center>
            </PageLayout>
        </>
    )
}

export default CreateChoreWizard
