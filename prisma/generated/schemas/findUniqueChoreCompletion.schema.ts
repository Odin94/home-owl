import { z } from "zod"
import { ChoreCompletionWhereUniqueInputObjectSchema } from "./objects/ChoreCompletionWhereUniqueInput.schema"

export const ChoreCompletionFindUniqueSchema = z.object({
    where: ChoreCompletionWhereUniqueInputObjectSchema,
})
