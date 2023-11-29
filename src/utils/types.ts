import { Prisma } from "@prisma/client"

export type UserWithChoreCompletions = Prisma.UserGetPayload<{
    include: { choreCompletions: true }
}>
