import { z } from "zod"
import { SortOrderSchema } from "../enums/SortOrder.schema"

import type { Prisma } from "@prisma/client"

const Schema: z.ZodType<Prisma.ChoreAvgOrderByAggregateInput> = z
    .object({
        points: z.lazy(() => SortOrderSchema).optional(),
        repeatIntervalMinutes: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict()

export const ChoreAvgOrderByAggregateInputObjectSchema = Schema
