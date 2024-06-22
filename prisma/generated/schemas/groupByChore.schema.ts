import { z } from "zod"
import { ChoreWhereInputObjectSchema } from "./objects/ChoreWhereInput.schema"
import { ChoreOrderByWithAggregationInputObjectSchema } from "./objects/ChoreOrderByWithAggregationInput.schema"
import { ChoreScalarWhereWithAggregatesInputObjectSchema } from "./objects/ChoreScalarWhereWithAggregatesInput.schema"
import { ChoreScalarFieldEnumSchema } from "./enums/ChoreScalarFieldEnum.schema"

export const ChoreGroupBySchema = z.object({
    where: ChoreWhereInputObjectSchema.optional(),
    orderBy: z
        .union([
            ChoreOrderByWithAggregationInputObjectSchema,
            ChoreOrderByWithAggregationInputObjectSchema.array(),
        ])
        .optional(),
    having: ChoreScalarWhereWithAggregatesInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    by: z.array(ChoreScalarFieldEnumSchema),
})
