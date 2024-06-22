import { z } from "zod"
import { ChoreCompletionCreateManyInputObjectSchema } from "./objects/ChoreCompletionCreateManyInput.schema"

export const ChoreCompletionCreateManySchema = z.object({
    data: z.union([
        ChoreCompletionCreateManyInputObjectSchema,
        z.array(ChoreCompletionCreateManyInputObjectSchema),
    ]),
    skipDuplicates: z.boolean().optional(),
})
