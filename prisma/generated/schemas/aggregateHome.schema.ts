import { z } from "zod"
import { HomeOrderByWithRelationInputObjectSchema } from "./objects/HomeOrderByWithRelationInput.schema"
import { HomeWhereInputObjectSchema } from "./objects/HomeWhereInput.schema"
import { HomeWhereUniqueInputObjectSchema } from "./objects/HomeWhereUniqueInput.schema"
import { HomeCountAggregateInputObjectSchema } from "./objects/HomeCountAggregateInput.schema"
import { HomeMinAggregateInputObjectSchema } from "./objects/HomeMinAggregateInput.schema"
import { HomeMaxAggregateInputObjectSchema } from "./objects/HomeMaxAggregateInput.schema"

export const HomeAggregateSchema = z.object({
    orderBy: z
        .union([
            HomeOrderByWithRelationInputObjectSchema,
            HomeOrderByWithRelationInputObjectSchema.array(),
        ])
        .optional(),
    where: HomeWhereInputObjectSchema.optional(),
    cursor: HomeWhereUniqueInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    _count: z
        .union([z.literal(true), HomeCountAggregateInputObjectSchema])
        .optional(),
    _min: HomeMinAggregateInputObjectSchema.optional(),
    _max: HomeMaxAggregateInputObjectSchema.optional(),
})
