import { clerkClient } from "@clerk/nextjs";
import { User } from "@clerk/nextjs/dist/types/server";
import { TRPCError } from "@trpc/server";
import {
    createTRPCRouter,
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
        const posts = await ctx.prisma.post.findMany({ take: 100 });

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
});
