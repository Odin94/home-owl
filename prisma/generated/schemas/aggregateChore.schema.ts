import { z } from "zod"
import { ChoreOrderByWithRelationInputObjectSchema } from "./objects/ChoreOrderByWithRelationInput.schema"
import { ChoreWhereInputObjectSchema } from "./objects/ChoreWhereInput.schema"
import { ChoreWhereUniqueInputObjectSchema } from "./objects/ChoreWhereUniqueInput.schema"
import { ChoreCountAggregateInputObjectSchema } from "./objects/ChoreCountAggregateInput.schema"
import { ChoreMinAggregateInputObjectSchema } from "./objects/ChoreMinAggregateInput.schema"
import { ChoreMaxAggregateInputObjectSchema } from "./objects/ChoreMaxAggregateInput.schema"
import { ChoreAvgAggregateInputObjectSchema } from "./objects/ChoreAvgAggregateInput.schema"
import { ChoreSumAggregateInputObjectSchema } from "./objects/ChoreSumAggregateInput.schema"

export const ChoreAggregateSchema = z.object({
    orderBy: z
        .union([
            ChoreOrderByWithRelationInputObjectSchema,
            ChoreOrderByWithRelationInputObjectSchema.array(),
        ])
        .optional(),
    where: ChoreWhereInputObjectSchema.optional(),
    cursor: ChoreWhereUniqueInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    _count: z
        .union([z.literal(true), ChoreCountAggregateInputObjectSchema])
        .optional(),
    _min: ChoreMinAggregateInputObjectSchema.optional(),
    _max: ChoreMaxAggregateInputObjectSchema.optional(),
    _avg: ChoreAvgAggregateInputObjectSchema.optional(),
    _sum: ChoreSumAggregateInputObjectSchema.optional(),
})
