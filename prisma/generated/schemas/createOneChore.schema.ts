import { z } from "zod"
import { ChoreCreateInputObjectSchema } from "./objects/ChoreCreateInput.schema"
import { ChoreUncheckedCreateInputObjectSchema } from "./objects/ChoreUncheckedCreateInput.schema"

export const ChoreCreateOneSchema = z.object({
    data: z.union([
        ChoreCreateInputObjectSchema,
        ChoreUncheckedCreateInputObjectSchema,
    ]),
})
