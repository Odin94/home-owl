import { createTRPCRouter } from "~/server/api/trpc"
import { postsRouter } from "./routers/posts"
import { profileRouter } from "./routers/profile"
import { homesRouter } from "./routers/homes"
import { usersRouter } from "./routers/users"
import { choresRouter } from "./routers/chores"

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
    posts: postsRouter,
    profile: profileRouter,
    home: homesRouter,
    user: usersRouter,
    chores: choresRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
