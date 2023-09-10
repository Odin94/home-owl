import { TRPCError } from "@trpc/server"
import { Ratelimit } from "@upstash/ratelimit"
import { Redis } from "@upstash/redis/nodejs"
import dayjs from "dayjs"
import duration from "dayjs/plugin/duration"
import { z } from "zod"
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc"
dayjs.extend(duration)

// Allow 10 requests per 20s
const ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(10, "20 s"),
    analytics: true,
})

export const choreCompletionsRouter = createTRPCRouter({
    create: protectedProcedure
        .input(z.object({ choreId: z.string() }))
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
                    message: "You need to belong to a home to complete chores",
                })
            }

            const { success } = await ratelimit.limit(ctx.userId)
            if (!success) {
                throw new TRPCError({ code: "TOO_MANY_REQUESTS" })
            }

            const chore = await ctx.prisma.chore.findUnique({
                where: { id: input.choreId },
            })
            if (!chore) {
                throw new TRPCError({
                    code: "BAD_REQUEST",
                    message: `Chore with id ${input.choreId} not found.`,
                })
            }

            const createChoreQuery = ctx.prisma.choreCompletion.create({
                data: {
                    points: chore.points,
                    chore: { connect: { id: chore.id } },
                    completedByUser: { connect: { id: me.id } },
                },
            })
            const updateUserQuery = ctx.prisma.user.update({
                where: { id: me.id },
                data: { points: me.points + chore.points },
            })
            const newDeadline = dayjs(chore.deadline)
                .add(dayjs.duration(chore.repeatIntervalMinutes, "minutes"))
                .toDate()
            const updateChoreQuery = ctx.prisma.chore.update({
                where: { id: chore.id },
                data: chore.shouldRepeat ? { deadline: newDeadline } : {},
            })

            const results = await ctx.prisma.$transaction([
                createChoreQuery,
                updateUserQuery,
                updateChoreQuery,
            ])

            return results[0]
        }),
})
