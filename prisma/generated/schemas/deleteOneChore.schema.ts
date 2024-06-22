import { z } from "zod"
import { ChoreWhereUniqueInputObjectSchema } from "./objects/ChoreWhereUniqueInput.schema"

export const ChoreDeleteOneSchema = z.object({
    where: ChoreWhereUniqueInputObjectSchema,
})
