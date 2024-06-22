import { z } from "zod"
import { ChoreCompletionUpdateInputObjectSchema } from "./objects/ChoreCompletionUpdateInput.schema"
import { ChoreCompletionUncheckedUpdateInputObjectSchema } from "./objects/ChoreCompletionUncheckedUpdateInput.schema"
import { ChoreCompletionWhereUniqueInputObjectSchema } from "./objects/ChoreCompletionWhereUniqueInput.schema"

export const ChoreCompletionUpdateOneSchema = z.object({
    data: z.union([
        ChoreCompletionUpdateInputObjectSchema,
        ChoreCompletionUncheckedUpdateInputObjectSchema,
    ]),
    where: ChoreCompletionWhereUniqueInputObjectSchema,
})
