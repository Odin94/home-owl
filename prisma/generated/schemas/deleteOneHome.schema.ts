import { z } from "zod"
import { HomeWhereUniqueInputObjectSchema } from "./objects/HomeWhereUniqueInput.schema"

export const HomeDeleteOneSchema = z.object({
    where: HomeWhereUniqueInputObjectSchema,
})
