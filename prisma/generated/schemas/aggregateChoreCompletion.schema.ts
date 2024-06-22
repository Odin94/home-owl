import { z } from "zod"
import { ChoreCompletionOrderByWithRelationInputObjectSchema } from "./objects/ChoreCompletionOrderByWithRelationInput.schema"
import { ChoreCompletionWhereInputObjectSchema } from "./objects/ChoreCompletionWhereInput.schema"
import { ChoreCompletionWhereUniqueInputObjectSchema } from "./objects/ChoreCompletionWhereUniqueInput.schema"
import { ChoreCompletionCountAggregateInputObjectSchema } from "./objects/ChoreCompletionCountAggregateInput.schema"
import { ChoreCompletionMinAggregateInputObjectSchema } from "./objects/ChoreCompletionMinAggregateInput.schema"
import { ChoreCompletionMaxAggregateInputObjectSchema } from "./objects/ChoreCompletionMaxAggregateInput.schema"
import { ChoreCompletionAvgAggregateInputObjectSchema } from "./objects/ChoreCompletionAvgAggregateInput.schema"
import { ChoreCompletionSumAggregateInputObjectSchema } from "./objects/ChoreCompletionSumAggregateInput.schema"

export const ChoreCompletionAggregateSchema = z.object({
    orderBy: z
        .union([
            ChoreCompletionOrderByWithRelationInputObjectSchema,
            ChoreCompletionOrderByWithRelationInputObjectSchema.array(),
        ])
        .optional(),
    where: ChoreCompletionWhereInputObjectSchema.optional(),
    cursor: ChoreCompletionWhereUniqueInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    _count: z
        .union([
            z.literal(true),
            ChoreCompletionCountAggregateInputObjectSchema,
        ])
        .optional(),
    _min: ChoreCompletionMinAggregateInputObjectSchema.optional(),
    _max: ChoreCompletionMaxAggregateInputObjectSchema.optional(),
    _avg: ChoreCompletionAvgAggregateInputObjectSchema.optional(),
    _sum: ChoreCompletionSumAggregateInputObjectSchema.optional(),
})
