import { z } from "zod"
import { HomeCreateInputObjectSchema } from "./objects/HomeCreateInput.schema"
import { HomeUncheckedCreateInputObjectSchema } from "./objects/HomeUncheckedCreateInput.schema"

export const HomeCreateOneSchema = z.object({
    data: z.union([
        HomeCreateInputObjectSchema,
        HomeUncheckedCreateInputObjectSchema,
    ]),
})
