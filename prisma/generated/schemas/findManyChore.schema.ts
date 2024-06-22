import { z } from "zod"
import { ChoreOrderByWithRelationInputObjectSchema } from "./objects/ChoreOrderByWithRelationInput.schema"
import { ChoreWhereInputObjectSchema } from "./objects/ChoreWhereInput.schema"
import { ChoreWhereUniqueInputObjectSchema } from "./objects/ChoreWhereUniqueInput.schema"
import { ChoreScalarFieldEnumSchema } from "./enums/ChoreScalarFieldEnum.schema"

export const ChoreFindManySchema = z.object({
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
    distinct: z.array(ChoreScalarFieldEnumSchema).optional(),
})
