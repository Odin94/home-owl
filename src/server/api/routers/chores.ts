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

export const choresRouter = createTRPCRouter({
    getMyChores: protectedProcedure.query(async ({ ctx }) => {
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

        return await ctx.prisma.chore.findMany({
            where: { homeId: me.homeId },
            orderBy: [{ deadline: "desc" }],
        })
    }),

    getById: protectedProcedure
        .input(
            z.object({
                choreId: z.string(),
            })
        )
        .query(async ({ ctx, input }) => {
            const chore = await ctx.prisma.chore.findUnique({
                where: { id: input.choreId },
            })

            if (!chore) {
                throw new TRPCError({ code: "NOT_FOUND" })
            }

            return chore
        }),

    create: protectedProcedure
        .input(createChoreInput)
        .mutation(async ({ ctx, input }) => {
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

            const { success } = await ratelimit.limit(ctx.userId)
            if (!success) {
                throw new TRPCError({ code: "TOO_MANY_REQUESTS" })
            }

            const chore = await ctx.prisma.chore.create({
                data: {
                    ...input,
                    home: { connect: { id: me?.homeId } },
                },
            })

            return chore
        }),
})
