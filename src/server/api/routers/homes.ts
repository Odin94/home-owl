import { clerkClient } from "@clerk/nextjs"
import { Home, Prisma } from "@prisma/client"
import { TRPCError } from "@trpc/server"
import { Ratelimit } from "@upstash/ratelimit"
import { Redis } from "@upstash/redis/nodejs"
import { z } from "zod"
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc"
import { filterUserForClient } from "~/server/utils"

// Allow 3 requests per 2 hours
const ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(3, "2 h"),
    analytics: true,
})

const addClerkUserDataToHome = async (home: HomeWithUsers | null) => {
    if (!home) return home

    const users = (
        await clerkClient.users.getUserList({
            userId: home.users.map((u) => u.clerkUserId),
            limit: 100,
        })
    ).map(filterUserForClient)

    return {
        ...home,
        clerkUsers: users,
    }
}

export const homesRouter = createTRPCRouter({
    create: protectedProcedure.mutation(async ({ ctx }) => {
        const userId = ctx.userId

        const user = await ctx.prisma.user.findUnique({
            where: { clerkUserId: userId },
        })
        if (!user) {
            throw new TRPCError({
                code: "NOT_FOUND",
                message: `User with id ${userId} not found.`,
            })
        }
        if (user.homeId) {
            throw new TRPCError({
                code: "CONFLICT",
                message: `Users may have only one home. Yours has the id ${user.homeId}.`,
            })
        }

        const { success } = await ratelimit.limit(userId)
        if (!success) {
            throw new TRPCError({ code: "TOO_MANY_REQUESTS" })
        }

        const userWithHome = await ctx.prisma.user.update({
            where: { id: user.id },
            data: {
                home: {
                    create: {},
                },
            },
            include: { home: true },
        })

        return userWithHome.home
    }),

    addUserToMyHome: protectedProcedure
        .input(z.object({ userName: z.string().min(1) }))
        .mutation(async ({ ctx, input }) => {
            const prismaUserWithHome = await ctx.prisma.user.findUnique({
                where: { clerkUserId: ctx.userId },
                include: { home: { include: { users: true, chores: true } } },
            })

            if (!prismaUserWithHome?.home) {
                throw new TRPCError({
                    code: "UNPROCESSABLE_CONTENT",
                    message: "Current user's home not found",
                })
            }

            const userToAdd = await ctx.prisma.user.findFirst({
                where: { name: input.userName },
            })

            if (!userToAdd) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "User to add not found.",
                })
            }

            await ctx.prisma.home.update({
                where: { id: prismaUserWithHome.home.id },
                data: {
                    users: { connect: { id: userToAdd.id } },
                },
            })
        }),

    getMyHome: protectedProcedure.query(async ({ ctx }) => {
        const prismaUserWithHome = await ctx.prisma.user.findUnique({
            where: { clerkUserId: ctx.userId },
            include: { home: { include: { users: true, chores: true } } },
        })

        if (!prismaUserWithHome?.home) {
            throw new TRPCError({
                code: "NOT_FOUND",
            })
        }

        return prismaUserWithHome.home
    }),

    getMyHomeWithClerk: protectedProcedure.query(async ({ ctx }) => {
        const home = await ctx.prisma.home.findUnique({
            where: { id: ctx.userId },
            include: { users: true, chores: true },
        })

        return addClerkUserDataToHome(home)
    }),
})

export type HomeWithUsers = Prisma.HomeGetPayload<{
    include: {
        users: true
    }
}>
