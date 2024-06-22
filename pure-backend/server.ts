import Fastify, { FastifyInstance, RouteShorthandOptions } from "fastify"
import { Server, IncomingMessage, ServerResponse } from "http"
import {
    serializerCompiler,
    validatorCompiler,
    ZodTypeProvider,
} from "fastify-type-provider-zod"
import { z } from "zod"
import { clerkPlugin } from "@clerk/fastify"

const server: FastifyInstance = Fastify({ logger: true })

server.register(clerkPlugin)

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
