import { PrismaClient } from "@prisma/client";
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { CONFLICT, FORBIDDEN, NOT_FOUND } from "./shared";
import { getAuth } from "@clerk/fastify";
import { clerkClient } from "@clerk/fastify"
import { UserModel } from "~prisma/generated/models";


export const registerUsers = (
    server: FastifyInstance,
    prisma: PrismaClient
) => {
        // create user
        server.withTypeProvider<ZodTypeProvider>().route({
            method: "POST",
            url: "/users",
            schema: {
                response: {
                    200: UserModel,
                    403: z.null(),
                    404: z.string(),
                    409: z.string(),
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
                if (user) {
                    return res.code(CONFLICT).send(`PrismaUser already exists. Yours has the clerkUserId ${userId}.`)
                }
        
                const clerkUser = (
                    await clerkClient.users.getUserList({
                        userId: [userId],
                    })
                ).data[0]
        
                if (!clerkUser) {
                    return res.code(NOT_FOUND).send(`Clerk user with id ${userId} not found.`)
                }
        
                const prismaUser = await prisma.user.create({
                    data: {
                        name: clerkUser.username,
                        email: clerkUser.emailAddresses[0]?.emailAddress,
                        imageUrl: clerkUser.imageUrl,
                        clerkUserId: clerkUser.id,
                    },
                })
        
                return res.send(prismaUser)
            },
        })

        // getMyUser
        server.withTypeProvider<ZodTypeProvider>().route({
            method: "GET",
            url: "/users/me",
            schema: {
                response: {
                    200: UserModel,
                    403: z.null(),
                },
            },
            handler: async (req, res) => {
                const { userId } = getAuth(req)
                if (!userId) {
                    return res.code(FORBIDDEN).send()
                }
                
                const user = await prisma.user.findUnique({
                    where: { clerkUserId: userId },
                    include: { choreCompletions: true, home: true },
                })
        
                return res.send(user)
            },
        })
}