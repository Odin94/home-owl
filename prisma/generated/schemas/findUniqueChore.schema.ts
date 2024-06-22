import { z } from "zod"
import { ChoreWhereUniqueInputObjectSchema } from "./objects/ChoreWhereUniqueInput.schema"

export const ChoreFindUniqueSchema = z.object({
    where: ChoreWhereUniqueInputObjectSchema,
})
