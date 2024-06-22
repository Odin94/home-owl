import { z } from "zod"
import { ChoreCreateManyInputObjectSchema } from "./objects/ChoreCreateManyInput.schema"

export const ChoreCreateManySchema = z.object({
    data: z.union([
        ChoreCreateManyInputObjectSchema,
        z.array(ChoreCreateManyInputObjectSchema),
    ]),
    skipDuplicates: z.boolean().optional(),
})
