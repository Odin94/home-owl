import { z } from "zod"
import { HomeOrderByWithRelationInputObjectSchema } from "./objects/HomeOrderByWithRelationInput.schema"
import { HomeWhereInputObjectSchema } from "./objects/HomeWhereInput.schema"
import { HomeWhereUniqueInputObjectSchema } from "./objects/HomeWhereUniqueInput.schema"
import { HomeScalarFieldEnumSchema } from "./enums/HomeScalarFieldEnum.schema"

export const HomeFindManySchema = z.object({
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
    distinct: z.array(HomeScalarFieldEnumSchema).optional(),
})
