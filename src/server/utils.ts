import { User } from "@clerk/nextjs/dist/types/server"
import { createServerSideHelpers } from "@trpc/react-query/server"
import superjson from "superjson"
import { appRouter } from "./api/root"
import { prisma } from "./db"

export const filterUserForClient = (user: User) => {
    return { id: user.id, name: user.username, imageUrl: user.imageUrl }
}

export const createSSRHelpers = () => {
    return createServerSideHelpers({
        router: appRouter,
        ctx: { prisma, userId: null },
        transformer: superjson,
    })
}
