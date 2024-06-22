import { z } from "zod"
import { ChoreCompletionCreateInputObjectSchema } from "./objects/ChoreCompletionCreateInput.schema"
import { ChoreCompletionUncheckedCreateInputObjectSchema } from "./objects/ChoreCompletionUncheckedCreateInput.schema"

export const ChoreCompletionCreateOneSchema = z.object({
    data: z.union([
        ChoreCompletionCreateInputObjectSchema,
        ChoreCompletionUncheckedCreateInputObjectSchema,
    ]),
})
