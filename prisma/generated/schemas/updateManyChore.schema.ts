import { z } from "zod"
import { ChoreUpdateManyMutationInputObjectSchema } from "./objects/ChoreUpdateManyMutationInput.schema"
import { ChoreWhereInputObjectSchema } from "./objects/ChoreWhereInput.schema"

export const ChoreUpdateManySchema = z.object({
    data: ChoreUpdateManyMutationInputObjectSchema,
    where: ChoreWhereInputObjectSchema.optional(),
})
