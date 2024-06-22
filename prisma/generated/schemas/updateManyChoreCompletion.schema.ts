import { z } from "zod"
import { ChoreCompletionUpdateManyMutationInputObjectSchema } from "./objects/ChoreCompletionUpdateManyMutationInput.schema"
import { ChoreCompletionWhereInputObjectSchema } from "./objects/ChoreCompletionWhereInput.schema"

export const ChoreCompletionUpdateManySchema = z.object({
    data: ChoreCompletionUpdateManyMutationInputObjectSchema,
    where: ChoreCompletionWhereInputObjectSchema.optional(),
})
