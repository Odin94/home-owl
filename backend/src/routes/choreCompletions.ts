import { getAuth } from "@clerk/fastify"
import { PrismaClient } from "@prisma/client"
import { Ratelimit } from "@upstash/ratelimit"
import { Redis } from "@upstash/redis"
import dayjs from "dayjs"
import duration from "dayjs/plugin/duration"
import relativeTime from "dayjs/plugin/relativeTime"
import { FastifyInstance } from "fastify"
import { ZodTypeProvider } from "fastify-type-provider-zod"
import { z } from "zod"
import { getNextDeadline } from "~/utils"
import { ChoreCompletionModel } from "~prisma/generated/models"
import {
    BAD_REQUEST,
    FORBIDDEN,
    NOT_FOUND,
    TOO_MANY_REQUESTS,
    UNAUTHORIZED,
    getUserWithHomeOrThrow,
} from "./shared"

dayjs.extend(duration)
dayjs.extend(relativeTime)

// Allow 10 requests per 20s
const ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(10, "20 s"),
    analytics: true,
})

export const registerChoreCompletions = (
    server: FastifyInstance,
    prisma: PrismaClient,
) => {
    // create chore completion
    server.withTypeProvider<ZodTypeProvider>().route({
        method: "POST",
        url: "/chore-completions",
        schema: {
            body: z.object({
                choreId: z.string(),
                completedAt: z.date().optional(),
            }),
            response: {
                200: ChoreCompletionModel,
                400: z.any(),
                401: z.string(),
                403: z.string(),
                429: z.null(),
            },
        },
        handler: async (req, res) => {
            const { userId } = getAuth(req)
            if (!userId) {
                return res.code(FORBIDDEN).send()
            }

            const { success } = await ratelimit.limit(userId)
            if (!success) {
                return res.code(TOO_MANY_REQUESTS).send()
            }

            try {
                const me = await getUserWithHomeOrThrow(userId, prisma)

                const chore = await prisma.chore.findUnique({
                    where: { id: req.body.choreId, homeId: me.homeId },
                })
                if (!chore) {
                    return res
                        .code(BAD_REQUEST)
                        .send(
                            `Chore with id ${req.body.choreId} not found in home with id ${me.homeId}.`,
                        )
                }

                const createChoreCompletionQuery =
                    prisma.choreCompletion.create({
                        data: {
                            points: chore.points,
                            choreName: chore.name,
                            chore: { connect: { id: chore.id } },
                            completedByUser: { connect: { id: me.id } },
                            completedAt: req.body.completedAt,
                        },
                    })
                const updateUserQuery = prisma.user.update({
                    where: { id: me.id },
                    data: { points: me.points + chore.points },
                })
                const newDeadline = getNextDeadline(
                    chore.deadline,
                    chore.repeatIntervalMinutes,
                )

                let updateChoreData = chore.shouldRepeat
                    ? { deadline: newDeadline }
                    : {}
                const now = dayjs()
                // Don't update deadline for custom completions in the past
                if (dayjs(req.body.completedAt).isBefore(now, "day")) {
                    updateChoreData = {}
                }
                const updateChoreQuery = prisma.chore.update({
                    where: { id: chore.id },
                    data: updateChoreData,
                })

                const results = await prisma.$transaction([
                    createChoreCompletionQuery,
                    updateUserQuery,
                    updateChoreQuery,
                ])

                res.send(results[0])
            } catch (e) {
                if (e instanceof Error) {
                    if (e.message.includes(`${UNAUTHORIZED}`))
                        return res.code(UNAUTHORIZED).send(e.message)
                    if (e.message.includes(`${BAD_REQUEST}`))
                        return res.code(BAD_REQUEST).send(e.message)
                }
                throw e
            }
        },
    })

    // delete chore completion
    server.withTypeProvider<ZodTypeProvider>().route({
        method: "POST",
        url: "/chore-completions/delete",
        schema: {
            body: z.object({ choreCompletionId: z.string() }),
            response: {
                200: ChoreCompletionModel,
                400: z.any(),
                401: z.string(),
                403: z.string(),
                404: z.string(),
                429: z.null(),
            },
        },
        handler: async (req, res) => {
            const { userId } = getAuth(req)
            if (!userId) {
                return res.code(FORBIDDEN).send()
            }

            const { success } = await ratelimit.limit(userId)
            if (!success) {
                return res.code(TOO_MANY_REQUESTS).send()
            }

            try {
                const me = await getUserWithHomeOrThrow(userId, prisma)
                const choreCompletion = await prisma.choreCompletion.findUnique(
                    {
                        where: {
                            id: req.body.choreCompletionId,
                            completedByUserId: me.id,
                        },
                    },
                )

                if (!choreCompletion) {
                    return res
                        .code(NOT_FOUND)
                        .send(
                            `ChoreCompletion with id ${req.body.choreCompletionId} not found or wasn't originally created by user ${userId}.`,
                        )
                }

                const deleteChoreQuery = prisma.choreCompletion.delete({
                    where: { id: req.body.choreCompletionId },
                })
                const updateUserQuery = prisma.user.update({
                    where: { id: me.id },
                    data: { points: me.points - choreCompletion.points },
                })

                const results = await prisma.$transaction([
                    deleteChoreQuery,
                    updateUserQuery,
                ])

                res.send(results[0])
            } catch (e) {
                if (e instanceof Error) {
                    if (e.message.includes(`${UNAUTHORIZED}`))
                        return res.code(UNAUTHORIZED).send(e.message)
                    if (e.message.includes(`${BAD_REQUEST}`))
                        return res.code(BAD_REQUEST).send(e.message)
                }
                throw e
            }
        },
    })
}
