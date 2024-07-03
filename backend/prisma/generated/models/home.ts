import * as z from "zod"
import { CompleteUser, RelatedUserModel, CompleteChore, RelatedChoreModel } from "./index"

export const HomeModel = z.object({
  id: z.string(),
  createdAt: z.date(),
})

export interface CompleteHome extends z.infer<typeof HomeModel> {
  users: CompleteUser[]
  chores: CompleteChore[]
}

/**
 * RelatedHomeModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedHomeModel: z.ZodSchema<CompleteHome> = z.lazy(() => HomeModel.extend({
  users: RelatedUserModel.array(),
  chores: RelatedChoreModel.array(),
}))
