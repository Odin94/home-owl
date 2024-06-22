import { z } from "zod"
import { ChoreWhereUniqueInputObjectSchema } from "./objects/ChoreWhereUniqueInput.schema"
import { ChoreCreateInputObjectSchema } from "./objects/ChoreCreateInput.schema"
import { ChoreUncheckedCreateInputObjectSchema } from "./objects/ChoreUncheckedCreateInput.schema"
import { ChoreUpdateInputObjectSchema } from "./objects/ChoreUpdateInput.schema"
import { ChoreUncheckedUpdateInputObjectSchema } from "./objects/ChoreUncheckedUpdateInput.schema"

export const ChoreUpsertSchema = z.object({
    where: ChoreWhereUniqueInputObjectSchema,
    create: z.union([
        ChoreCreateInputObjectSchema,
        ChoreUncheckedCreateInputObjectSchema,
    ]),
    update: z.union([
        ChoreUpdateInputObjectSchema,
        ChoreUncheckedUpdateInputObjectSchema,
    ]),
})
