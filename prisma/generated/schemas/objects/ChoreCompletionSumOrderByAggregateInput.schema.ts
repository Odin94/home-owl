import { z } from "zod"
import { SortOrderSchema } from "../enums/SortOrder.schema"

import type { Prisma } from "@prisma/client"

const Schema: z.ZodType<Prisma.ChoreCompletionSumOrderByAggregateInput> = z
    .object({
        points: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict()

export const ChoreCompletionSumOrderByAggregateInputObjectSchema = Schema
