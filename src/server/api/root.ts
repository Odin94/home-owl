import { createTRPCRouter } from "~/server/api/trpc"
import { choreCompletionsRouter } from "./routers/choreCompletions"
import { choresRouter } from "./routers/chores"
import { homesRouter } from "./routers/homes"
import { profileRouter } from "./routers/profile"
import { usersRouter } from "./routers/users"

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
    profile: profileRouter,
    home: homesRouter,
    user: usersRouter,
    chores: choresRouter,
    choreCompletions: choreCompletionsRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
