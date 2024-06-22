import { z } from "zod"
import { HomeUpdateManyMutationInputObjectSchema } from "./objects/HomeUpdateManyMutationInput.schema"
import { HomeWhereInputObjectSchema } from "./objects/HomeWhereInput.schema"

export const HomeUpdateManySchema = z.object({
    data: HomeUpdateManyMutationInputObjectSchema,
    where: HomeWhereInputObjectSchema.optional(),
})
