import { z } from "zod"
import { SortOrderSchema } from "../enums/SortOrder.schema"
import { ChoreCountOrderByAggregateInputObjectSchema } from "./ChoreCountOrderByAggregateInput.schema"
import { ChoreAvgOrderByAggregateInputObjectSchema } from "./ChoreAvgOrderByAggregateInput.schema"
import { ChoreMaxOrderByAggregateInputObjectSchema } from "./ChoreMaxOrderByAggregateInput.schema"
import { ChoreMinOrderByAggregateInputObjectSchema } from "./ChoreMinOrderByAggregateInput.schema"
import { ChoreSumOrderByAggregateInputObjectSchema } from "./ChoreSumOrderByAggregateInput.schema"

import type { Prisma } from "@prisma/client"

const Schema: z.ZodType<Prisma.ChoreOrderByWithAggregationInput> = z
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
        _count: z
            .lazy(() => ChoreCountOrderByAggregateInputObjectSchema)
            .optional(),
        _avg: z
            .lazy(() => ChoreAvgOrderByAggregateInputObjectSchema)
            .optional(),
        _max: z
            .lazy(() => ChoreMaxOrderByAggregateInputObjectSchema)
            .optional(),
        _min: z
            .lazy(() => ChoreMinOrderByAggregateInputObjectSchema)
            .optional(),
        _sum: z
            .lazy(() => ChoreSumOrderByAggregateInputObjectSchema)
            .optional(),
    })
    .strict()

export const ChoreOrderByWithAggregationInputObjectSchema = Schema
