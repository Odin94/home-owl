import { clerkClient } from "@clerk/nextjs"
import { TRPCError } from "@trpc/server"
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc"

// TODO: Add create for setting up your prisma user based on your clerk user (check if already exists)
export const usersRouter = createTRPCRouter({
    create: protectedProcedure.mutation(async ({ ctx }) => {
        const userId = ctx.userId

        const user = await ctx.prisma.user.findUnique({
            where: { clerkUserId: userId },
        })
        if (user) {
            throw new TRPCError({
                code: "CONFLICT",
                message: `PrismaUser already exists. Yours has the clerkUserId ${userId}.`,
            })
        }

        const clerkUser = (
            await clerkClient.users.getUserList({
                userId: [userId],
            })
        )[0]

        if (!clerkUser) {
            throw new TRPCError({
                code: "NOT_FOUND",
                message: `Clerk user with id ${userId} not found.`,
            })
        }

        const prismaUser = await ctx.prisma.user.create({
            data: {
                name: clerkUser.username,
                email: clerkUser.emailAddresses[0]?.emailAddress,
                imageUrl: clerkUser.imageUrl,
                clerkUserId: clerkUser.id,
            },
        })

        return prismaUser
    }),

    getMyUser: protectedProcedure.query(async ({ ctx }) => {
        const user = await ctx.prisma.user.findUnique({
            where: { clerkUserId: ctx.userId },
            include: { choreCompletions: true, home: true },
        })

        return user
    }),
})
