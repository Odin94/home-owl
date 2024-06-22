import { z } from "zod"
import { ChoreCompletionWhereInputObjectSchema } from "./objects/ChoreCompletionWhereInput.schema"
import { ChoreCompletionOrderByWithAggregationInputObjectSchema } from "./objects/ChoreCompletionOrderByWithAggregationInput.schema"
import { ChoreCompletionScalarWhereWithAggregatesInputObjectSchema } from "./objects/ChoreCompletionScalarWhereWithAggregatesInput.schema"
import { ChoreCompletionScalarFieldEnumSchema } from "./enums/ChoreCompletionScalarFieldEnum.schema"

export const ChoreCompletionGroupBySchema = z.object({
    where: ChoreCompletionWhereInputObjectSchema.optional(),
    orderBy: z
        .union([
            ChoreCompletionOrderByWithAggregationInputObjectSchema,
            ChoreCompletionOrderByWithAggregationInputObjectSchema.array(),
        ])
        .optional(),
    having: ChoreCompletionScalarWhereWithAggregatesInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    by: z.array(ChoreCompletionScalarFieldEnumSchema),
})
