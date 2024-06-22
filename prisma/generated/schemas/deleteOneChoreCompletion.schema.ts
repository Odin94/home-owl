import { z } from "zod"
import { ChoreCompletionWhereUniqueInputObjectSchema } from "./objects/ChoreCompletionWhereUniqueInput.schema"

export const ChoreCompletionDeleteOneSchema = z.object({
    where: ChoreCompletionWhereUniqueInputObjectSchema,
})
