import { z } from "zod"
import { ChoreCompletionWhereUniqueInputObjectSchema } from "./objects/ChoreCompletionWhereUniqueInput.schema"
import { ChoreCompletionCreateInputObjectSchema } from "./objects/ChoreCompletionCreateInput.schema"
import { ChoreCompletionUncheckedCreateInputObjectSchema } from "./objects/ChoreCompletionUncheckedCreateInput.schema"
import { ChoreCompletionUpdateInputObjectSchema } from "./objects/ChoreCompletionUpdateInput.schema"
import { ChoreCompletionUncheckedUpdateInputObjectSchema } from "./objects/ChoreCompletionUncheckedUpdateInput.schema"

export const ChoreCompletionUpsertSchema = z.object({
    where: ChoreCompletionWhereUniqueInputObjectSchema,
    create: z.union([
        ChoreCompletionCreateInputObjectSchema,
        ChoreCompletionUncheckedCreateInputObjectSchema,
    ]),
    update: z.union([
        ChoreCompletionUpdateInputObjectSchema,
        ChoreCompletionUncheckedUpdateInputObjectSchema,
    ]),
})
