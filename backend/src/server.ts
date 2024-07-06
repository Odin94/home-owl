import "dotenv/config"

import Fastify, { FastifyInstance, RouteShorthandOptions } from "fastify"
import { Server, IncomingMessage, ServerResponse } from "http"
import {
    serializerCompiler,
    validatorCompiler,
    ZodTypeProvider,
} from "fastify-type-provider-zod"
import cors from "@fastify/cors"
import { ZodError, z } from "zod"
import { clerkPlugin } from "@clerk/fastify"
import { registerHomes } from "./routes/homes"
import { PrismaClient } from "@prisma/client"
import { registerProfiles } from "./routes/profile"
import { registerUsers } from "./routes/users"
import { registerChores } from "./routes/chores"
import { registerChoreCompletions } from "./routes/choreCompletions"

const app = async () => {
    const server: FastifyInstance = Fastify({ logger: true })

    server.register(clerkPlugin)
    void server.register(cors, {
        origin: (origin, cb) => {
            if (origin) {
                const hostname = new URL(origin).hostname
                if (
                    hostname === "localhost" ||
                    hostname === "*.odin-matthias.de"
                ) {
                    //  Request from localhost will pass
                    cb(null, true)
                    return
                }
            }
            // Generate an error on other origins, disabling access
            cb(new Error("cors not allowed"), false)
        },
        credentials: true,
    })

    server.setValidatorCompiler(validatorCompiler)
    server.setSerializerCompiler(serializerCompiler)

    // send zod errors as object rather than strings
    server.setErrorHandler((error, request, reply) => {
        if (error instanceof ZodError) {
            return reply.status(400).send({
                statusCode: 400,
                error: "Bad Request",
                issues: error.issues,
            })
        }
        if (error.message === "cors not allowed") {
            return reply.status(403).send({
                error: "cors not allowed",
            })
        }

        reply.send(error)
    })

    server.withTypeProvider<ZodTypeProvider>().route({
        method: "GET",
        url: "/",
        schema: {
            response: {
                200: z.string(),
            },
        },
        handler: async (req, res) => {
            req.log.info("WHAT")
            res.send("Home Owl online 🦉")
        },
    })

    const prisma = new PrismaClient()
    registerChoreCompletions(server, prisma)
    registerChores(server, prisma)
    registerHomes(server, prisma)
    registerProfiles(server, prisma)
    registerUsers(server, prisma)

    const start = async () => {
        try {
            await server.listen({ port: 8080 })

            const address = server.server.address()
            const port = typeof address === "string" ? address : address?.port
        } catch (err) {
            server.log.error(err)
            process.exit(1)
        }
    }

    start()

    return server
}

export const viteNodeApp = app()
