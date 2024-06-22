import { z } from "zod"
import { HomeCreateManyInputObjectSchema } from "./objects/HomeCreateManyInput.schema"

export const HomeCreateManySchema = z.object({
    data: z.union([
        HomeCreateManyInputObjectSchema,
        z.array(HomeCreateManyInputObjectSchema),
    ]),
    skipDuplicates: z.boolean().optional(),
})
