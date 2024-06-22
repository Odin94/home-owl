import { z } from "zod"
import { ChoreCompletionWhereInputObjectSchema } from "./ChoreCompletionWhereInput.schema"

import type { Prisma } from "@prisma/client"

const Schema: z.ZodType<Prisma.ChoreCompletionListRelationFilter> = z
    .object({
        every: z.lazy(() => ChoreCompletionWhereInputObjectSchema).optional(),
        some: z.lazy(() => ChoreCompletionWhereInputObjectSchema).optional(),
        none: z.lazy(() => ChoreCompletionWhereInputObjectSchema).optional(),
    })
    .strict()

export const ChoreCompletionListRelationFilterObjectSchema = Schema
