import { z } from "zod"
import { SortOrderSchema } from "../enums/SortOrder.schema"
import { SortOrderInputObjectSchema } from "./SortOrderInput.schema"
import { AccountOrderByRelationAggregateInputObjectSchema } from "./AccountOrderByRelationAggregateInput.schema"
import { SessionOrderByRelationAggregateInputObjectSchema } from "./SessionOrderByRelationAggregateInput.schema"
import { ChoreCompletionOrderByRelationAggregateInputObjectSchema } from "./ChoreCompletionOrderByRelationAggregateInput.schema"
import { HomeOrderByWithRelationInputObjectSchema } from "./HomeOrderByWithRelationInput.schema"

import type { Prisma } from "@prisma/client"

const Schema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z
    .object({
        id: z.lazy(() => SortOrderSchema).optional(),
        name: z
            .union([
                z.lazy(() => SortOrderSchema),
                z.lazy(() => SortOrderInputObjectSchema),
            ])
            .optional(),
        email: z
            .union([
                z.lazy(() => SortOrderSchema),
                z.lazy(() => SortOrderInputObjectSchema),
            ])
            .optional(),
        emailVerified: z
            .union([
                z.lazy(() => SortOrderSchema),
                z.lazy(() => SortOrderInputObjectSchema),
            ])
            .optional(),
        imageUrl: z
            .union([
                z.lazy(() => SortOrderSchema),
                z.lazy(() => SortOrderInputObjectSchema),
            ])
            .optional(),
        clerkUserId: z.lazy(() => SortOrderSchema).optional(),
        points: z.lazy(() => SortOrderSchema).optional(),
        homeId: z
            .union([
                z.lazy(() => SortOrderSchema),
                z.lazy(() => SortOrderInputObjectSchema),
            ])
            .optional(),
        accounts: z
            .lazy(() => AccountOrderByRelationAggregateInputObjectSchema)
            .optional(),
        sessions: z
            .lazy(() => SessionOrderByRelationAggregateInputObjectSchema)
            .optional(),
        choreCompletions: z
            .lazy(
                () => ChoreCompletionOrderByRelationAggregateInputObjectSchema
            )
            .optional(),
        home: z.lazy(() => HomeOrderByWithRelationInputObjectSchema).optional(),
    })
    .strict()

export const UserOrderByWithRelationInputObjectSchema = Schema
