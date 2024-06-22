import { z } from "zod"
import { HomeWhereInputObjectSchema } from "./objects/HomeWhereInput.schema"
import { HomeOrderByWithAggregationInputObjectSchema } from "./objects/HomeOrderByWithAggregationInput.schema"
import { HomeScalarWhereWithAggregatesInputObjectSchema } from "./objects/HomeScalarWhereWithAggregatesInput.schema"
import { HomeScalarFieldEnumSchema } from "./enums/HomeScalarFieldEnum.schema"

export const HomeGroupBySchema = z.object({
    where: HomeWhereInputObjectSchema.optional(),
    orderBy: z
        .union([
            HomeOrderByWithAggregationInputObjectSchema,
            HomeOrderByWithAggregationInputObjectSchema.array(),
        ])
        .optional(),
    having: HomeScalarWhereWithAggregatesInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    by: z.array(HomeScalarFieldEnumSchema),
})
