import { z } from "zod"
import { ChoreCompletionOrderByWithRelationInputObjectSchema } from "./objects/ChoreCompletionOrderByWithRelationInput.schema"
import { ChoreCompletionWhereInputObjectSchema } from "./objects/ChoreCompletionWhereInput.schema"
import { ChoreCompletionWhereUniqueInputObjectSchema } from "./objects/ChoreCompletionWhereUniqueInput.schema"
import { ChoreCompletionScalarFieldEnumSchema } from "./enums/ChoreCompletionScalarFieldEnum.schema"

export const ChoreCompletionFindManySchema = z.object({
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
    distinct: z.array(ChoreCompletionScalarFieldEnumSchema).optional(),
})
