import { z } from "zod"
import { SortOrderSchema } from "../enums/SortOrder.schema"
import { HomeCountOrderByAggregateInputObjectSchema } from "./HomeCountOrderByAggregateInput.schema"
import { HomeMaxOrderByAggregateInputObjectSchema } from "./HomeMaxOrderByAggregateInput.schema"
import { HomeMinOrderByAggregateInputObjectSchema } from "./HomeMinOrderByAggregateInput.schema"

import type { Prisma } from "@prisma/client"

const Schema: z.ZodType<Prisma.HomeOrderByWithAggregationInput> = z
    .object({
        id: z.lazy(() => SortOrderSchema).optional(),
        createdAt: z.lazy(() => SortOrderSchema).optional(),
        _count: z
            .lazy(() => HomeCountOrderByAggregateInputObjectSchema)
            .optional(),
        _max: z.lazy(() => HomeMaxOrderByAggregateInputObjectSchema).optional(),
        _min: z.lazy(() => HomeMinOrderByAggregateInputObjectSchema).optional(),
    })
    .strict()

export const HomeOrderByWithAggregationInputObjectSchema = Schema
