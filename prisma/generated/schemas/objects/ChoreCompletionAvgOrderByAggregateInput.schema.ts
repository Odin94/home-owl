import { z } from "zod"
import { SortOrderSchema } from "../enums/SortOrder.schema"

import type { Prisma } from "@prisma/client"

const Schema: z.ZodType<Prisma.ChoreCompletionAvgOrderByAggregateInput> = z
    .object({
        points: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict()

export const ChoreCompletionAvgOrderByAggregateInputObjectSchema = Schema
