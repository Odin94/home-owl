import { z } from "zod"
import { SortOrderSchema } from "../enums/SortOrder.schema"
import { SortOrderInputObjectSchema } from "./SortOrderInput.schema"
import { ChoreCompletionCountOrderByAggregateInputObjectSchema } from "./ChoreCompletionCountOrderByAggregateInput.schema"
import { ChoreCompletionAvgOrderByAggregateInputObjectSchema } from "./ChoreCompletionAvgOrderByAggregateInput.schema"
import { ChoreCompletionMaxOrderByAggregateInputObjectSchema } from "./ChoreCompletionMaxOrderByAggregateInput.schema"
import { ChoreCompletionMinOrderByAggregateInputObjectSchema } from "./ChoreCompletionMinOrderByAggregateInput.schema"
import { ChoreCompletionSumOrderByAggregateInputObjectSchema } from "./ChoreCompletionSumOrderByAggregateInput.schema"

import type { Prisma } from "@prisma/client"

const Schema: z.ZodType<Prisma.ChoreCompletionOrderByWithAggregationInput> = z
    .object({
        id: z.lazy(() => SortOrderSchema).optional(),
        createdAt: z.lazy(() => SortOrderSchema).optional(),
        completedAt: z.lazy(() => SortOrderSchema).optional(),
        choreId: z
            .union([
                z.lazy(() => SortOrderSchema),
                z.lazy(() => SortOrderInputObjectSchema),
            ])
            .optional(),
        choreName: z
            .union([
                z.lazy(() => SortOrderSchema),
                z.lazy(() => SortOrderInputObjectSchema),
            ])
            .optional(),
        points: z.lazy(() => SortOrderSchema).optional(),
        completedByUserId: z.lazy(() => SortOrderSchema).optional(),
        _count: z
            .lazy(() => ChoreCompletionCountOrderByAggregateInputObjectSchema)
            .optional(),
        _avg: z
            .lazy(() => ChoreCompletionAvgOrderByAggregateInputObjectSchema)
            .optional(),
        _max: z
            .lazy(() => ChoreCompletionMaxOrderByAggregateInputObjectSchema)
            .optional(),
        _min: z
            .lazy(() => ChoreCompletionMinOrderByAggregateInputObjectSchema)
            .optional(),
        _sum: z
            .lazy(() => ChoreCompletionSumOrderByAggregateInputObjectSchema)
            .optional(),
    })
    .strict()

export const ChoreCompletionOrderByWithAggregationInputObjectSchema = Schema
