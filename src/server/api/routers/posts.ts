import { clerkClient } from "@clerk/nextjs";
import { User } from "@clerk/nextjs/dist/types/server";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import {
    createTRPCRouter,
    protectedProcedure,
    publicProcedure
} from "~/server/api/trpc";

const filterUserForClient = (user: User) => {
    return { id: user.id, name: user.username, imageUrl: user.imageUrl }
}

export const postsRouter = createTRPCRouter({
    // hello: publicProcedure
    // .input(z.object({ text: z.string() }))
    // .query(({ input }) => {
    //   return {
    //     greeting: `Hello ${input.text}`,
    //   };
    // }),

    getAllWithAuthor: publicProcedure.query(async ({ ctx }) => {
        const posts = await ctx.prisma.post.findMany({
            take: 100,
            orderBy: [{ createdAt: "asc" }]
        });

        const users = (await clerkClient.users.getUserList({
            userId: posts.map((post) => post.authorId),
            limit: 100,
        })).map(filterUserForClient);

        return posts.map(post => {
            const author = users.find((user) => user.id === post.authorId)
            if (!author || !author.name) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: `Author(-name) for post '${post.id}' not found` })

            return { post, author }
        });
    }),

    create: protectedProcedure.input(z.object({
        content: z.string().min(1).max(280)
    })).mutation(async ({ ctx, input }) => {
        const authorId = ctx.session.user.id
        console.log({ authorId })

        const post = await ctx.prisma.post.create({
            data: {
                authorId,
                content: input.content,
            }
        })

        return post
    })
});
