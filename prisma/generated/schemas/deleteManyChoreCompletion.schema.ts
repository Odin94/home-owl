import { z } from "zod"
import { ChoreCompletionWhereInputObjectSchema } from "./objects/ChoreCompletionWhereInput.schema"

export const ChoreCompletionDeleteManySchema = z.object({
    where: ChoreCompletionWhereInputObjectSchema.optional(),
})
