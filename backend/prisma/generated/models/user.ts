import * as z from "zod"
import { CompleteAccount, RelatedAccountModel, CompleteSession, RelatedSessionModel, CompleteChoreCompletion, RelatedChoreCompletionModel, CompleteHome, RelatedHomeModel } from "./index"

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

export interface CompleteUser extends z.infer<typeof UserModel> {
  accounts: CompleteAccount[]
  sessions: CompleteSession[]
  choreCompletions: CompleteChoreCompletion[]
  home?: CompleteHome | null
}

/**
 * RelatedUserModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedUserModel: z.ZodSchema<CompleteUser> = z.lazy(() => UserModel.extend({
  accounts: RelatedAccountModel.array(),
  sessions: RelatedSessionModel.array(),
  choreCompletions: RelatedChoreCompletionModel.array(),
  home: RelatedHomeModel.nullish(),
}))
