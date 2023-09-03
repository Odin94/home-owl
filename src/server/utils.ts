import { User } from "@clerk/nextjs/dist/types/server";

export const filterUserForClient = (user: User) => {
    return { id: user.id, name: user.username, imageUrl: user.imageUrl }
}