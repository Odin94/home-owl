import { z } from "zod"
import { ChoreWhereInputObjectSchema } from "./objects/ChoreWhereInput.schema"

export const ChoreDeleteManySchema = z.object({
    where: ChoreWhereInputObjectSchema.optional(),
})
