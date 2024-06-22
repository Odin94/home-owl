import { z } from "zod"
import { SortOrderSchema } from "../enums/SortOrder.schema"
import { UserOrderByRelationAggregateInputObjectSchema } from "./UserOrderByRelationAggregateInput.schema"
import { ChoreOrderByRelationAggregateInputObjectSchema } from "./ChoreOrderByRelationAggregateInput.schema"

import type { Prisma } from "@prisma/client"

const Schema: z.ZodType<Prisma.HomeOrderByWithRelationInput> = z
    .object({
        id: z.lazy(() => SortOrderSchema).optional(),
        createdAt: z.lazy(() => SortOrderSchema).optional(),
        users: z
            .lazy(() => UserOrderByRelationAggregateInputObjectSchema)
            .optional(),
        chores: z
            .lazy(() => ChoreOrderByRelationAggregateInputObjectSchema)
            .optional(),
    })
    .strict()

export const HomeOrderByWithRelationInputObjectSchema = Schema
