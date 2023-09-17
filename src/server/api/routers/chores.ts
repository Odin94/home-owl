import { Prisma, PrismaClient } from "@prisma/client"
import { DefaultArgs } from "@prisma/client/runtime/library"
import { TRPCError } from "@trpc/server"
import { Ratelimit } from "@upstash/ratelimit"
import { Redis } from "@upstash/redis/nodejs"
import { z } from "zod"
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc"

// Allow 10 requests per 30s
const ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(10, "30 s"),
    analytics: true,
})

export const createChoreInput = z.object({
    name: z.string().min(1),
    description: z.string(),
    points: z.number().int().min(0),
    deadline: z.date(),
    shouldRepeat: z.boolean(),
    repeatIntervalMinutes: z.number().int().min(0),
})

const getMyHomeIdOrError = async (ctx: {
    prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>
    userId: string
}) => {
    const me = await ctx.prisma.user.findUnique({
        where: { clerkUserId: ctx.userId },
    })

    if (!me) {
        throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "Own user not found",
        })
    }
    if (!me.homeId) {
        throw new TRPCError({
            code: "BAD_REQUEST",
            message: "You need to belong to a home to get chores",
        })
    }

    return me.homeId
}

export const choresRouter = createTRPCRouter({
    getMyChores: protectedProcedure.query(async ({ ctx }) => {
        const myHomeId = await getMyHomeIdOrError(ctx)

        return await ctx.prisma.chore.findMany({
            where: { homeId: myHomeId },
            orderBy: [{ deadline: "asc" }],
        })
    }),

    getById: protectedProcedure
        .input(
            z.object({
                choreId: z.string(),
            })
        )
        .query(async ({ ctx, input }) => {
            const myHomeId = await getMyHomeIdOrError(ctx)

            const chore = await ctx.prisma.chore.findUnique({
                // TODO: Make sure all chores are only accessible to their owners
                where: { id: input.choreId, homeId: myHomeId },
            })

            if (!chore) {
                throw new TRPCError({ code: "NOT_FOUND" })
            }

            return chore
        }),

    create: protectedProcedure
        .input(createChoreInput)
        .mutation(async ({ ctx, input }) => {
            const myHomeId = await getMyHomeIdOrError(ctx)

            const { success } = await ratelimit.limit(ctx.userId)
            if (!success) {
                throw new TRPCError({ code: "TOO_MANY_REQUESTS" })
            }

            const chore = await ctx.prisma.chore.create({
                data: {
                    ...input,
                    home: { connect: { id: myHomeId } },
                },
            })

            return chore
        }),

    update: protectedProcedure
        .input(createChoreInput.extend({ id: z.string().min(1) }))
        .mutation(async ({ ctx, input }) => {
            const myHomeId = await getMyHomeIdOrError(ctx)

            const { success } = await ratelimit.limit(ctx.userId)
            if (!success) {
                throw new TRPCError({ code: "TOO_MANY_REQUESTS" })
            }

            const chore = await ctx.prisma.chore.update({
                where: { homeId: myHomeId, id: input.id },
                data: {
                    ...input,
                },
            })

            return chore
        }),

    delete: protectedProcedure
        .input(z.object({ id: z.string().min(1) }))
        .mutation(async ({ ctx, input }) => {
            const myHomeId = await getMyHomeIdOrError(ctx)

            await ctx.prisma.chore.delete({
                where: { homeId: myHomeId, id: input.id },
            })
        }),
})
