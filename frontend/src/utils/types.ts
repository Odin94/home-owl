import { z } from "zod"

export type Chore = {
    id: string
    name: string
    deadline: any
    repeatIntervalMinutes: number
    description: string
    points: number
    shouldRepeat: boolean
}

export type ChoreGetPayload = Chore

export type CreateChoreSubmitValues = any //z.infer<typeof createChoreInput>

export const ChoreCompletionModel = z.object({
    id: z.string(),
    choreId: z.string(),
    completedAt: z.date(),
    points: z.number().positive(),
    completedByUserId: z.string(),
    choreName: z.string(),
})

export type ChoreCompletion = z.infer<typeof ChoreCompletionModel>

export type ChoreCompletionInput = {
    choreId: string
    completedAt?: any
}

export const ChoreModel = z.object({})

export const UserModel = z.object({
    id: z.string(),
    points: z.number().positive(),
    choreCompletions: z.array(z.any()),
    name: z.string(),
    imageUrl: z.string(),
})
export type User = z.infer<typeof UserModel>

export const UserWithChoreCompletionsModel = UserModel.extend({
    choreCompletions: z.array(z.any()),
})
export type UserWithChoreCompletions = z.infer<
    typeof UserWithChoreCompletionsModel
>

export const HomeModel = z.object({})
export type Home = z.infer<typeof HomeModel>

export const HomeWithUsersModel = HomeModel.extend({
    users: z.array(UserModel),
})
export type HomeWithUsers = z.infer<typeof HomeWithUsersModel>
