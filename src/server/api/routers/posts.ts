import { clerkClient } from "@clerk/nextjs";
import { Post } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis/nodejs";
import { z } from "zod";
import {
    createTRPCRouter,
    protectedProcedure,
    publicProcedure
} from "~/server/api/trpc";
import { filterUserForClient } from "~/server/utils";

// Allow 10 requests per 30s
const ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(10, "30 s"),
    analytics: true,
})

const addUserDataToPosts = async (posts: Post[]) => {
    const users = (await clerkClient.users.getUserList({
        userId: posts.map((post) => post.authorId),
        limit: 100,
    })).map(filterUserForClient);

    return posts.map(post => {
        const author = users.find((user) => user.id === post.authorId)
        if (!author || !author.name) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: `Author(-name) for post '${post.id}' not found` })

        return { post, author }
    });
}

export const postsRouter = createTRPCRouter({
    getAll: publicProcedure.query(async ({ ctx }) => {
        const posts = await ctx.prisma.post.findMany({
            take: 100,
            orderBy: [{ createdAt: "desc" }],
        });

        return addUserDataToPosts(posts)
    }),

    getById: publicProcedure.
        input(z.object({
            postId: z.string(),
        }))
        .query(async ({ ctx, input }) => {
            const post = await ctx.prisma.post.findUnique({
                where: { id: input.postId },
            })

            if (!post) {
                throw new TRPCError({ code: "NOT_FOUND" })
            }

            return (await addUserDataToPosts([post]))[0]
        }),

    getByUserId: publicProcedure.
        input(z.object({
            userId: z.string(),
        }))
        .query(async ({ ctx, input }) => {
            const posts = await ctx.prisma.post.findMany({
                where: { authorId: input.userId },
                take: 100,
                orderBy: [{ createdAt: "desc" }],
            })

            return addUserDataToPosts(posts)
        }),

    create: protectedProcedure
        .input(z.object({
            content: z.string().min(1).max(280)
        }))
        .mutation(async ({ ctx, input }) => {
            const authorId = ctx.userId

            const { success } = await ratelimit.limit(authorId)
            if (!success) {
                throw new TRPCError({ code: "TOO_MANY_REQUESTS", })
            }

            const post = await ctx.prisma.post.create({
                data: {
                    authorId,
                    content: input.content,
                }
            })

            return post
        })
});
