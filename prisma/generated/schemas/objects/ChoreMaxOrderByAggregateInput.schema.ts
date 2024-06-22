import { z } from "zod"
import { SortOrderSchema } from "../enums/SortOrder.schema"

import type { Prisma } from "@prisma/client"

const Schema: z.ZodType<Prisma.ChoreMaxOrderByAggregateInput> = z
    .object({
        id: z.lazy(() => SortOrderSchema).optional(),
        createdAt: z.lazy(() => SortOrderSchema).optional(),
        name: z.lazy(() => SortOrderSchema).optional(),
        description: z.lazy(() => SortOrderSchema).optional(),
        points: z.lazy(() => SortOrderSchema).optional(),
        shouldRepeat: z.lazy(() => SortOrderSchema).optional(),
        repeatIntervalMinutes: z.lazy(() => SortOrderSchema).optional(),
        deadline: z.lazy(() => SortOrderSchema).optional(),
        homeId: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict()

export const ChoreMaxOrderByAggregateInputObjectSchema = Schema
