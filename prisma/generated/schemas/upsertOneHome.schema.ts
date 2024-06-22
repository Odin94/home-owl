import { z } from "zod"
import { HomeWhereUniqueInputObjectSchema } from "./objects/HomeWhereUniqueInput.schema"
import { HomeCreateInputObjectSchema } from "./objects/HomeCreateInput.schema"
import { HomeUncheckedCreateInputObjectSchema } from "./objects/HomeUncheckedCreateInput.schema"
import { HomeUpdateInputObjectSchema } from "./objects/HomeUpdateInput.schema"
import { HomeUncheckedUpdateInputObjectSchema } from "./objects/HomeUncheckedUpdateInput.schema"

export const HomeUpsertSchema = z.object({
    where: HomeWhereUniqueInputObjectSchema,
    create: z.union([
        HomeCreateInputObjectSchema,
        HomeUncheckedCreateInputObjectSchema,
    ]),
    update: z.union([
        HomeUpdateInputObjectSchema,
        HomeUncheckedUpdateInputObjectSchema,
    ]),
})
