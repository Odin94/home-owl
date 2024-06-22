import { z } from "zod"
import { ChoreUpdateInputObjectSchema } from "./objects/ChoreUpdateInput.schema"
import { ChoreUncheckedUpdateInputObjectSchema } from "./objects/ChoreUncheckedUpdateInput.schema"
import { ChoreWhereUniqueInputObjectSchema } from "./objects/ChoreWhereUniqueInput.schema"

export const ChoreUpdateOneSchema = z.object({
    data: z.union([
        ChoreUpdateInputObjectSchema,
        ChoreUncheckedUpdateInputObjectSchema,
    ]),
    where: ChoreWhereUniqueInputObjectSchema,
})
