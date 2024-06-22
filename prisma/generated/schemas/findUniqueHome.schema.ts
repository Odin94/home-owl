import { z } from "zod"
import { HomeWhereUniqueInputObjectSchema } from "./objects/HomeWhereUniqueInput.schema"

export const HomeFindUniqueSchema = z.object({
    where: HomeWhereUniqueInputObjectSchema,
})
