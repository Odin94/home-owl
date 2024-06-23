import { Prisma, PrismaClient } from "@prisma/client"
import { DefaultArgs } from "@prisma/client/runtime/library"

export const BAD_REQUEST = 400
export const UNAUTHORIZED = 401
export const FORBIDDEN = 403
export const NOT_FOUND = 404
export const CONFLICT = 409
export const UNPROCESSABLE_CONTENT = 422
export const TOO_MANY_REQUESTS = 429

export const getUserWithHomeOrThrow = async (
    userId: string,
    prisma: PrismaClient,
) => {
    const user = await prisma.user.findUnique({
        where: { clerkUserId: userId },
    })

    if (!user) {
        throw new Error(`${UNAUTHORIZED} - User not found`)
    }
    if (!user.homeId) {
        throw new Error(`${BAD_REQUEST} - User doesn't belong to a home`)
    }

    // This makes typescript understand that homeId is not null
    return { ...user, homeId: user.homeId }
}

export const getChoresForUserOrThrow = async (
    userId: string,
    prisma: PrismaClient,
) => {
    const user = await getUserWithHomeOrThrow(userId, prisma)
    return await prisma.chore.findMany({
        where: { homeId: user.homeId },
        orderBy: [{ deadline: "asc" }],
    })
}
