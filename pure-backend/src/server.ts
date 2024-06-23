import "dotenv/config"

import Fastify, { FastifyInstance, RouteShorthandOptions } from "fastify"
import { Server, IncomingMessage, ServerResponse } from "http"
import {
    serializerCompiler,
    validatorCompiler,
    ZodTypeProvider,
} from "fastify-type-provider-zod"
import cors from "@fastify/cors"
import { z } from "zod"
import { clerkPlugin } from "@clerk/fastify"
import { registerHomes } from "./routes/homes"
import { PrismaClient } from "@prisma/client"
import { registerProfiles } from "./routes/profile"
import { registerUsers } from "./routes/users"
import { registerChores } from "./routes/chores"
import { registerChoreCompletions } from "./routes/choreCompletions"

const server: FastifyInstance = Fastify({ logger: true })

server.register(clerkPlugin)
void server.register(cors, {
    origin: (origin, cb) => {
        if (!origin) return
        const hostname = new URL(origin).hostname
        if (hostname === "localhost" || hostname === "*.odin-matthias.de") {
            //  Request from localhost will pass
            cb(null, true)
            return
        }
        // Generate an error on other origins, disabling access
        cb(new Error("Not allowed"), false)
    },
    credentials: true,
})

server.setValidatorCompiler(validatorCompiler)
server.setSerializerCompiler(serializerCompiler)

server.withTypeProvider<ZodTypeProvider>().route({
    method: "GET",
    url: "/",
    schema: {
        querystring: z.object({
            name: z.string().min(4),
        }),
        // body: z.object...
        response: {
            200: z.string(),
        },
    },
    handler: (req, res) => {
        res.send(req.query.name)
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
