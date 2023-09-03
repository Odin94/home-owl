import { clerkClient } from "@clerk/nextjs";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import {
    createTRPCRouter,
    publicProcedure
} from "~/server/api/trpc";
import { filterUserForClient } from "~/server/utils";

export const profileRouter = createTRPCRouter({
    getUserByUsername: publicProcedure
        .input(z.object({
            username: z.string()
        }))
        .query(async ({ ctx, input }) => {
            console.log(input.username)

            const [user] = await clerkClient.users.getUserList({
                username: [input.username]
            })

            if (!user) {
                throw new TRPCError({ code: "NOT_FOUND", message: "User not found" })
            }

            const filtered = filterUserForClient(user)

            console.log({ filtered })

            return filtered
        })
});
