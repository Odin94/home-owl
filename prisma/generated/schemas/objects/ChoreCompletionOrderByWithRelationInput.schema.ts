import { z } from "zod"
import { SortOrderSchema } from "../enums/SortOrder.schema"
import { SortOrderInputObjectSchema } from "./SortOrderInput.schema"
import { ChoreOrderByWithRelationInputObjectSchema } from "./ChoreOrderByWithRelationInput.schema"
import { UserOrderByWithRelationInputObjectSchema } from "./UserOrderByWithRelationInput.schema"

import type { Prisma } from "@prisma/client"

const Schema: z.ZodType<Prisma.ChoreCompletionOrderByWithRelationInput> = z
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
        chore: z
            .lazy(() => ChoreOrderByWithRelationInputObjectSchema)
            .optional(),
        completedByUser: z
            .lazy(() => UserOrderByWithRelationInputObjectSchema)
            .optional(),
    })
    .strict()

export const ChoreCompletionOrderByWithRelationInputObjectSchema = Schema
