import { z } from "zod"
import { HomeUpdateInputObjectSchema } from "./objects/HomeUpdateInput.schema"
import { HomeUncheckedUpdateInputObjectSchema } from "./objects/HomeUncheckedUpdateInput.schema"
import { HomeWhereUniqueInputObjectSchema } from "./objects/HomeWhereUniqueInput.schema"

export const HomeUpdateOneSchema = z.object({
    data: z.union([
        HomeUpdateInputObjectSchema,
        HomeUncheckedUpdateInputObjectSchema,
    ]),
    where: HomeWhereUniqueInputObjectSchema,
})
