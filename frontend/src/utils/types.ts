import { z } from "zod"

export const createChoreInput = z.object({
    name: z.string().min(1),
    description: z.string(),
    points: z.number().int().min(0),
    deadline: z.date(),
    shouldRepeat: z.boolean(),
    repeatIntervalMinutes: z.number().int().min(0),
})
export type CreateChoreSubmitValues = z.infer<typeof createChoreInput>

export const updateChoreInput = createChoreInput.extend({
    id: z.string().min(1),
})
export type UpdateChoreSubmitValues = z.infer<typeof updateChoreInput>

export const ChoreCompletionModel = z.object({
    id: z.string(),
    createdAt: z.date(),
    completedAt: z.date(),
    choreId: z.string().nullish(),
    choreName: z.string().nullish(),
    points: z.number().int(),
    completedByUserId: z.string(),
})

export type ChoreCompletion = z.infer<typeof ChoreCompletionModel>

export type ChoreCompletionInput = {
    choreId: string
    completedAt?: any
}

export const ChoreModel = z.object({
    id: z.string(),
    createdAt: z.date(),
    name: z.string(),
    description: z.string(),
    points: z.number().int(),
    shouldRepeat: z.boolean(),
    repeatIntervalMinutes: z.number().int(),
    deadline: z.date(),
    homeId: z.string(),
})

export type Chore = z.infer<typeof ChoreModel>

export const UserModel = z.object({
    id: z.string(),
    name: z.string().nullish(),
    email: z.string().nullish(),
    emailVerified: z.date().nullish(),
    imageUrl: z.string().nullish(),
    clerkUserId: z.string(),
    points: z.number().int(),
    homeId: z.string().nullish(),
})
export type User = z.infer<typeof UserModel>

export const UserWithChoreCompletionsModel = UserModel.extend({
    choreCompletions: z.any().array(),
})
export type UserWithChoreCompletions = z.infer<
    typeof UserWithChoreCompletionsModel
>

export const HomeModel = z.object({
    id: z.string(),
    createdAt: z.date(),
})
export type Home = z.infer<typeof HomeModel>

export const HomeWithUsersModel = HomeModel.extend({
    users: UserModel.array(),
})
export type HomeWithUsers = z.infer<typeof HomeWithUsersModel>
