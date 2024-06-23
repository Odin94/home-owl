import { getAuth } from "@clerk/fastify"
import { PrismaClient } from "@prisma/client"
import { Ratelimit } from "@upstash/ratelimit"
import { Redis } from "@upstash/redis"
import { FastifyInstance } from "fastify"
import { ZodTypeProvider } from "fastify-type-provider-zod"
import { z } from "zod"
import { ChoreModel } from "~prisma/generated/models"
import {
    BAD_REQUEST,
    FORBIDDEN,
    NOT_FOUND,
    TOO_MANY_REQUESTS,
    UNAUTHORIZED,
    getChoresForUserOrThrow,
    getUserWithHomeOrThrow,
} from "./shared"

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

export const registerChores = (
    server: FastifyInstance,
    prisma: PrismaClient,
) => {
    // get my chores
    server.withTypeProvider<ZodTypeProvider>().route({
        method: "GET",
        url: "/chores/me",
        schema: {
            response: {
                200: ChoreModel.array(),
                400: z.string(),
                403: z.null(),
                401: z.string(),
                404: z.string(),
            },
        },
        handler: async (req, res) => {
            const { userId } = getAuth(req)
            if (!userId) {
                return res.code(FORBIDDEN).send()
            }

            try {
                const chores = await getChoresForUserOrThrow(userId, prisma)
                res.send(chores)
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

    // get chore by id
    server.withTypeProvider<ZodTypeProvider>().route({
        method: "GET",
        url: "/chores/$choreId",
        schema: {
            params: z.object({ choreId: z.string() }),
            response: {
                200: ChoreModel,
                400: z.string(),
                401: z.string(),
                403: z.null(),
                404: z.null(),
            },
        },
        handler: async (req, res) => {
            const { userId } = getAuth(req)
            if (!userId) {
                return res.code(FORBIDDEN).send()
            }

            const choreId = req.params.choreId

            try {
                const myHomeId = (await getUserWithHomeOrThrow(userId, prisma))
                    .homeId

                const chore = await prisma.chore.findUnique({
                    where: { id: choreId, homeId: myHomeId },
                })
                if (!chore) {
                    return res.code(NOT_FOUND).send()
                }

                return res.send(chore)
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

    // create chore
    server.withTypeProvider<ZodTypeProvider>().route({
        method: "POST",
        url: "/chores",
        schema: {
            body: createChoreInput,
            response: {
                200: ChoreModel,
                400: z.string(),
                401: z.string(),
                403: z.null(),
                409: z.string(),
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
                const myHomeId = me.homeId

                const chore = await prisma.chore.create({
                    data: {
                        ...req.body,
                        home: { connect: { id: myHomeId } },
                    },
                })

                res.send(chore)
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

    // update chore
    server.withTypeProvider<ZodTypeProvider>().route({
        method: "POST",
        url: "/chores/update",
        schema: {
            body: createChoreInput.extend({ id: z.string().min(1) }),
            response: {
                200: ChoreModel,
                400: z.string(),
                401: z.string(),
                403: z.null(),
                404: z.null(),
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
                const myHomeId = (await getUserWithHomeOrThrow(userId, prisma))
                    .homeId
                const chore = await prisma.chore.update({
                    where: { homeId: myHomeId, id: req.body.id },
                    data: {
                        ...req.body,
                    },
                })
                if (!chore) {
                    return res.code(NOT_FOUND).send()
                }

                res.send(chore)
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

    // delete chore
    server.withTypeProvider<ZodTypeProvider>().route({
        method: "POST",
        url: "/chores/delete",
        schema: {
            body: z.object({ id: z.string().min(1) }),
            response: {
                200: z.null(),
                400: z.string(),
                401: z.string(),
                403: z.null(),
                404: z.null(),
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
                const myHomeId = (await getUserWithHomeOrThrow(userId, prisma))
                    .homeId

                await prisma.chore.delete({
                    where: { homeId: myHomeId, id: req.body.id },
                })
                return res.send()
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
