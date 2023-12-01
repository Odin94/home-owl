import { TRPCError } from "@trpc/server"
import { Ratelimit } from "@upstash/ratelimit"
import { Redis } from "@upstash/redis/nodejs"
import { z } from "zod"
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc"
import { getChoresForUserOrThrow, getUserWithHomeOrThrow } from "./shared"

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
        return await getChoresForUserOrThrow(ctx)
    }),

    getById: protectedProcedure
        .input(
            z.object({
                choreId: z.string(),
            })
        )
        .query(async ({ ctx, input }) => {
            const myHomeId = (await getUserWithHomeOrThrow(ctx)).homeId

            const chore = await ctx.prisma.chore.findUnique({
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
            const { success } = await ratelimit.limit(ctx.userId)
            if (!success) {
                throw new TRPCError({ code: "TOO_MANY_REQUESTS" })
            }

            const me = await getUserWithHomeOrThrow(ctx)
            const myHomeId = me.homeId

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
            const { success } = await ratelimit.limit(ctx.userId)
            if (!success) {
                throw new TRPCError({ code: "TOO_MANY_REQUESTS" })
            }

            const myHomeId = (await getUserWithHomeOrThrow(ctx)).homeId
            const chore = await ctx.prisma.chore.update({
                where: { homeId: myHomeId, id: input.id },
                data: {
                    ...input,
                },
            })
            if (!chore) {
                throw new TRPCError({ code: "NOT_FOUND" })
            }

            return chore
        }),

    delete: protectedProcedure
        .input(z.object({ id: z.string().min(1) }))
        .mutation(async ({ ctx, input }) => {
            const { success } = await ratelimit.limit(ctx.userId)
            if (!success) {
                throw new TRPCError({ code: "TOO_MANY_REQUESTS" })
            }

            const myHomeId = (await getUserWithHomeOrThrow(ctx)).homeId

            await ctx.prisma.chore.delete({
                where: { homeId: myHomeId, id: input.id },
            })
        }),
})
