import * as z from "zod"
import { CompleteHome, RelatedHomeModel, CompleteChoreCompletion, RelatedChoreCompletionModel } from "./index"

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

export interface CompleteChore extends z.infer<typeof ChoreModel> {
  home: CompleteHome
  choreCompletions: CompleteChoreCompletion[]
}

/**
 * RelatedChoreModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedChoreModel: z.ZodSchema<CompleteChore> = z.lazy(() => ChoreModel.extend({
  home: RelatedHomeModel,
  choreCompletions: RelatedChoreCompletionModel.array(),
}))
