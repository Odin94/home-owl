import { z } from "zod"
import { HomeWhereInputObjectSchema } from "./objects/HomeWhereInput.schema"

export const HomeDeleteManySchema = z.object({
    where: HomeWhereInputObjectSchema.optional(),
})
