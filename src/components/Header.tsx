import { useUser } from "@clerk/nextjs"
import { useEffect } from "react"
import { api } from "~/utils/api"

const LoginHeader = () => {
    const ctx = api.useContext()
    const { isLoaded: isClerkUserLoaded, isSignedIn } = useUser()

    const { data: prismaUser, isLoading: isPrismaUserLoading } =
        api.user.getMyUser.useQuery()

    const { mutate: createPrismaUser } = api.user.create.useMutation({
        onSuccess: () => {
            void ctx.user.getMyUser.invalidate()
        },
        onError: (err: any) => {
            console.log({ err })
        },
    })

    // If we do have a clerk user, but no prisma user -> create prisma user
    useEffect(() => {
        if (
            isClerkUserLoaded &&
            isSignedIn &&
            !isPrismaUserLoading &&
            !prismaUser
        ) {
            createPrismaUser()
        }
    }, [isClerkUserLoaded, isSignedIn, isPrismaUserLoading, prismaUser])

    // TODO: Put header with login/logout buttons here
    return <div></div>
}

export default LoginHeader
