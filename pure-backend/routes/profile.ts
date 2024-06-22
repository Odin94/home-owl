import { clerkClient } from "@clerk/nextjs"
import { PrismaClient } from "@prisma/client"
import { FastifyInstance } from "fastify"
import { ZodTypeProvider } from "fastify-type-provider-zod"
import { z } from "zod"
import { filterUserForClient } from "~/server/utils"
import { NOT_FOUND } from "./shared"

export const PublicUserSchema = {
    id: z.string(),
    name: z.string(),
    imageUrl: z.string(),
}

export const registerProfiles = (
    server: FastifyInstance,
    prisma: PrismaClient
) => {
    // getUserByUsername
    server.withTypeProvider<ZodTypeProvider>().route({
        method: "GET",
        url: "/profiles/getUserByUsername",
        schema: {
            body: z.object({ username: z.string() }),
            response: {
                200: PublicUserSchema,
                404: z.string(),
            },
        },
        handler: async (req, res) => {
            const [user] = await clerkClient.users.getUserList({
                username: [req.body.username],
            })

            if (!user) {
                return res.code(NOT_FOUND).send("User not found")
            }

            const filtered = filterUserForClient(user)

            res.send(filtered)
        },
    })
}
