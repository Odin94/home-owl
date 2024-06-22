import { z } from "zod"
import { SortOrderSchema } from "../enums/SortOrder.schema"

import type { Prisma } from "@prisma/client"

const Schema: z.ZodType<Prisma.ChoreCompletionCountOrderByAggregateInput> = z
    .object({
        id: z.lazy(() => SortOrderSchema).optional(),
        createdAt: z.lazy(() => SortOrderSchema).optional(),
        completedAt: z.lazy(() => SortOrderSchema).optional(),
        choreId: z.lazy(() => SortOrderSchema).optional(),
        choreName: z.lazy(() => SortOrderSchema).optional(),
        points: z.lazy(() => SortOrderSchema).optional(),
        completedByUserId: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict()

export const ChoreCompletionCountOrderByAggregateInputObjectSchema = Schema
