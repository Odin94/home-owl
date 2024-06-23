import * as z from "zod"
import { CompleteChore, RelatedChoreModel, CompleteUser, RelatedUserModel } from "./index"

export const ChoreCompletionModel = z.object({
  id: z.string(),
  createdAt: z.date(),
  completedAt: z.date(),
  choreId: z.string().nullish(),
  choreName: z.string().nullish(),
  points: z.number().int(),
  completedByUserId: z.string(),
})

export interface CompleteChoreCompletion extends z.infer<typeof ChoreCompletionModel> {
  chore?: CompleteChore | null
  completedByUser: CompleteUser
}

/**
 * RelatedChoreCompletionModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedChoreCompletionModel: z.ZodSchema<CompleteChoreCompletion> = z.lazy(() => ChoreCompletionModel.extend({
  chore: RelatedChoreModel.nullish(),
  completedByUser: RelatedUserModel,
}))
