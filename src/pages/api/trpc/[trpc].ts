import { createNextApiHandler } from "@trpc/server/adapters/next"
import { NextApiRequest, NextApiResponse } from "next"
import { env } from "~/env.mjs"
import { appRouter } from "~/server/api/root"
import { createTRPCContext } from "~/server/api/trpc"
import { getBaseUrl } from "~/utils/api"

// export API handler
const nextApiHandler = createNextApiHandler({
    router: appRouter,
    createContext: createTRPCContext,
    onError:
        env.NODE_ENV === "development"
            ? ({ path, error }) => {
                  console.error(
                      `❌ tRPC failed on ${path ?? "<no-path>"}: ${
                          error.message
                      }`
                  )
              }
            : undefined,
})

// @see https://nextjs.org/docs/api-routes/introduction
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const allowedOrigins = [
        "capacitor://nextjs-native.dev",
        "capacitor://localhost",
        "http://localhost:3000",
        "https://localhost:3000",
        "https://localhost",
        process.env.VERCEL_URL
            ? `https://${process.env.VERCEL_URL}`
            : getBaseUrl(),
    ]

    const origin = req.headers.host ?? ""
    if (allowedOrigins.includes(origin)) {
        res.setHeader("Access-Control-Allow-Origin", origin)
    }

    // We can use the response object to enable CORS
    res.setHeader("Access-Control-Request-Method", "*")
    res.setHeader(
        "Access-Control-Allow-Methods",
        "OPTIONS, GET, POST, PUT, DELETE"
    )
    res.setHeader("Access-Control-Allow-Headers", "*")
    // If you need to make authenticated CORS calls then
    // remove what is above and uncomment the below code
    // Allow-Origin has to be set to the requesting domain that you want to send the credentials back to
    // res.setHeader('Access-Control-Allow-Origin', 'http://example:6006');
    // res.setHeader('Access-Control-Request-Method', '*');
    // res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
    // res.setHeader('Access-Control-Allow-Headers', 'content-type');
    // res.setHeader('Referrer-Policy', 'no-referrer');
    res.setHeader("Access-Control-Allow-Credentials", "true")
    if (req.method === "OPTIONS") {
        res.writeHead(200)
        return res.end()
    }
    // finally pass the request on to the tRPC handler
    return nextApiHandler(req, res)
}
