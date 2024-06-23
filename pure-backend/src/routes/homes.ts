import { getAuth } from "@clerk/fastify"
import { clerkClient } from "@clerk/fastify"
import { PrismaClient } from "@prisma/client"
import { Ratelimit } from "@upstash/ratelimit"
import { FastifyInstance } from "fastify"
import { ZodTypeProvider } from "fastify-type-provider-zod"
import { ChoreModel, HomeModel, UserModel } from "~prisma/generated/models"
import { z } from "zod"
import {
    BAD_REQUEST,
    CONFLICT,
    FORBIDDEN,
    NOT_FOUND,
    TOO_MANY_REQUESTS,
    UNPROCESSABLE_CONTENT,
} from "./shared"
import { filterUserForClient } from "~/utils"
import { Redis } from "@upstash/redis"

// Allow 3 requests per 2 hours
const ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(3, "2 h"),
    analytics: true,
})

export const ClerkUserSchema = z
    .object({
        id: z.string(),
        name: z.string().nullable(),
        imageUrl: z.string(),
    })
    .optional()

export const ExtendedHomeSchema = HomeModel.extend({
    users: UserModel.array(),
    chores: ChoreModel.array(),
})

export type ExtendedHome = z.infer<typeof ExtendedHomeSchema>

export const ExtendedHomeWithClerkSchema = ExtendedHomeSchema.extend({
    clerkUsers: z.array(ClerkUserSchema).nullable(),
}).nullable()

export type ExtendedHomeWithClerk = z.infer<typeof ExtendedHomeWithClerkSchema>

const addClerkUserDataToHome = async (
    home: ExtendedHome | null
): Promise<ExtendedHomeWithClerk> => {
    if (!home) return null

    // getUserList returns a paginated result, which may become an issue if there's a large amount of users in a home
    const users = (
        await clerkClient.users.getUserList({
            userId: home.users.map((u) => u.clerkUserId),
            limit: 100,
        })
    ).data.map(filterUserForClient)

    return {
        ...home,
        clerkUsers: users,
    }
}

export const registerHomes = (
    server: FastifyInstance,
    prisma: PrismaClient
) => {
    // create home
    server.withTypeProvider<ZodTypeProvider>().route({
        method: "POST",
        url: "/homes/create",
        schema: {
            response: {
                200: z.union([HomeModel, z.null()]),
                404: z.string(),
                409: z.string(),
                429: z.string(),
            },
        },
        handler: async (req, res) => {
            const { userId } = getAuth(req)
            if (!userId) {
                return res.code(FORBIDDEN).send()
            }

            const user = await prisma.user.findUnique({
                where: { clerkUserId: userId },
            })
            if (!user) {
                return res
                    .code(NOT_FOUND)
                    .send(`User with id ${userId} not found.`)
            }
            if (user.homeId) {
                return res
                    .code(CONFLICT)
                    .send(
                        `Users may have only one home. Yours has the id ${user.homeId}.`
                    )
            }

            const { success } = await ratelimit.limit(userId)
            if (!success) {
                return res
                    .code(TOO_MANY_REQUESTS)
                    .send(
                        `Users may have only one home. Yours has the id ${user.homeId}.`
                    )
            }

            const userWithHome = await prisma.user.update({
                where: { id: user.id },
                data: {
                    home: {
                        create: {},
                    },
                },
                include: { home: true },
            })

            res.send(userWithHome.home)
        },
    })

    // addUserToMyHome
    server.withTypeProvider<ZodTypeProvider>().route({
        method: "POST",
        url: "/homes/addUserToMyHome",
        schema: {
            body: z.object({ userName: z.string().min(1) }),
            response: {
                200: z.null(),
                422: z.string(),
            },
        },
        handler: async (req, res) => {
            const { userId } = getAuth(req)
            if (!userId) {
                return res.code(CONFLICT).send()
            }

            const prismaUserWithHome = await prisma.user.findUnique({
                where: { clerkUserId: userId },
                include: { home: { include: { users: true, chores: true } } },
            })

            if (!prismaUserWithHome?.home) {
                return res
                    .code(UNPROCESSABLE_CONTENT)
                    .send("Current user's home not found")
            }

            const userToAdd = await prisma.user.findFirst({
                where: { name: req.body.userName },
            })

            if (!userToAdd) {
                return res.code(NOT_FOUND).send("User to add not found.")
            }

            await prisma.home.update({
                where: { id: prismaUserWithHome.home.id },
                data: {
                    users: { connect: { id: userToAdd.id } },
                },
            })

            res.code(200).send()
        },
    })

    // getMyHome
    server.withTypeProvider<ZodTypeProvider>().route({
        method: "GET",
        url: "/homes/getMyHome",
        schema: {
            response: {
                200: HomeModel.extend({
                    users: UserModel.array(),
                    chores: ChoreModel.array(),
                }),
                403: z.null(),
                404: z.null(),
            },
        },
        handler: async (req, res) => {
            const { userId } = getAuth(req)
            if (!userId) {
                return res.code(FORBIDDEN).send()
            }

            const prismaUserWithHome = await prisma.user.findUnique({
                where: { clerkUserId: userId },
                include: { home: { include: { users: true, chores: true } } },
            })

            if (!prismaUserWithHome?.home) {
                return res.code(NOT_FOUND).send()
            }

            res.code(200).send(prismaUserWithHome.home)
        },
    })

    // getMyHomeWithClerk
    server.withTypeProvider<ZodTypeProvider>().route({
        method: "GET",
        url: "/homes/getMyHomeWithClerk",
        schema: {
            response: {
                200: ExtendedHomeWithClerkSchema,
                403: z.null(),
            },
        },
        handler: async (req, res) => {
            const { userId } = getAuth(req)
            if (!userId) {
                return res.code(FORBIDDEN).send()
            }

            const home = await prisma.home.findUnique({
                where: { id: userId },
                include: { users: true, chores: true },
            })

            const response = await addClerkUserDataToHome(home)

            res.code(200).send(response)
        },
    })

    // getUsersWithChoreCompletionsInMyHome
    server.withTypeProvider<ZodTypeProvider>().route({
        method: "GET",
        url: "/homes/getUsersWithChoreCompletionsInMyHome",
        schema: {
            response: {
                200: z.array(UserModel),
                400: z.string(),
                403: z.string().optional(),
                404: z.null(),
            },
        },
        handler: async (req, res) => {
            const { userId } = getAuth(req)
            if (!userId) {
                return res.code(FORBIDDEN).send()
            }

            const me = await prisma.user.findUnique({
                where: { clerkUserId: userId },
            })

            if (!me) {
                return res.code(FORBIDDEN).send("Own user not found")
            }
            if (!me.homeId) {
                return res
                    .code(BAD_REQUEST)
                    .send("You need to belong to a home to complete chores")
            }

            const users = await prisma.user.findMany({
                where: { homeId: me.homeId },
                include: { choreCompletions: true },
            })

            if (users.length === 0) {
                return res.code(NOT_FOUND).send()
            }

            res.code(200).send(users)
        },
    })
}
