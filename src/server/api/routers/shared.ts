import { Prisma, PrismaClient } from "@prisma/client"
import { DefaultArgs } from "@prisma/client/runtime/library"
import { TRPCError } from "@trpc/server"

export const getUserWithHomeOrThrow = async (ctx: {
    prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>
    userId: string
}) => {
    const user = await ctx.prisma.user.findUnique({
        where: { clerkUserId: ctx.userId },
    })

    if (!user) {
        throw new TRPCError({
            code: "UNAUTHORIZED",
            message: `User ${ctx.userId} not found`,
        })
    }
    if (!user.homeId) {
        throw new TRPCError({
            code: "BAD_REQUEST",
            message: "User doesn't belong to a home",
        })
    }

    // This makes typescript understand that homeId is not null
    return { ...user, homeId: user.homeId }
}

// TODOdin: merge with function above; doing dynamic "include" doesn't work (at least not easily) because it breaks typing on ctx.prisma.user.findUnique
export const getUserWithHomeOrThrowIncludingChoreCompletions = async (ctx: {
    prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>
    userId: string
}) => {
    const user = await ctx.prisma.user.findUnique({
        where: { clerkUserId: ctx.userId },
        include: { choreCompletions: true },
    })

    if (!user) {
        throw new TRPCError({
            code: "UNAUTHORIZED",
            message: `User ${ctx.userId} not found`,
        })
    }
    if (!user.homeId) {
        throw new TRPCError({
            code: "BAD_REQUEST",
            message: "User doesn't belong to a home",
        })
    }

    // This makes typescript understand that homeId is not null
    return { ...user, homeId: user.homeId }
}

export const getChoresForUserOrThrow = async (ctx: {
    prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>
    userId: string
}) => {
    const user = await getUserWithHomeOrThrow(ctx)
    return await ctx.prisma.chore.findMany({
        where: { homeId: user.homeId },
        orderBy: [{ deadline: "asc" }],
    })
}
