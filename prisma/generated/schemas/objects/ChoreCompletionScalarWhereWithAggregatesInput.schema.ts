import { z } from "zod"
import { StringWithAggregatesFilterObjectSchema } from "./StringWithAggregatesFilter.schema"
import { DateTimeWithAggregatesFilterObjectSchema } from "./DateTimeWithAggregatesFilter.schema"
import { StringNullableWithAggregatesFilterObjectSchema } from "./StringNullableWithAggregatesFilter.schema"
import { IntWithAggregatesFilterObjectSchema } from "./IntWithAggregatesFilter.schema"

import type { Prisma } from "@prisma/client"

const Schema: z.ZodType<Prisma.ChoreCompletionScalarWhereWithAggregatesInput> =
    z
        .object({
            AND: z
                .union([
                    z.lazy(
                        () =>
                            ChoreCompletionScalarWhereWithAggregatesInputObjectSchema
                    ),
                    z
                        .lazy(
                            () =>
                                ChoreCompletionScalarWhereWithAggregatesInputObjectSchema
                        )
                        .array(),
                ])
                .optional(),
            OR: z
                .lazy(
                    () =>
                        ChoreCompletionScalarWhereWithAggregatesInputObjectSchema
                )
                .array()
                .optional(),
            NOT: z
                .union([
                    z.lazy(
                        () =>
                            ChoreCompletionScalarWhereWithAggregatesInputObjectSchema
                    ),
                    z
                        .lazy(
                            () =>
                                ChoreCompletionScalarWhereWithAggregatesInputObjectSchema
                        )
                        .array(),
                ])
                .optional(),
            id: z
                .union([
                    z.lazy(() => StringWithAggregatesFilterObjectSchema),
                    z.string(),
                ])
                .optional(),
            createdAt: z
                .union([
                    z.lazy(() => DateTimeWithAggregatesFilterObjectSchema),
                    z.coerce.date(),
                ])
                .optional(),
            completedAt: z
                .union([
                    z.lazy(() => DateTimeWithAggregatesFilterObjectSchema),
                    z.coerce.date(),
                ])
                .optional(),
            choreId: z
                .union([
                    z.lazy(
                        () => StringNullableWithAggregatesFilterObjectSchema
                    ),
                    z.string(),
                ])
                .optional()
                .nullable(),
            choreName: z
                .union([
                    z.lazy(
                        () => StringNullableWithAggregatesFilterObjectSchema
                    ),
                    z.string(),
                ])
                .optional()
                .nullable(),
            points: z
                .union([
                    z.lazy(() => IntWithAggregatesFilterObjectSchema),
                    z.number(),
                ])
                .optional(),
            completedByUserId: z
                .union([
                    z.lazy(() => StringWithAggregatesFilterObjectSchema),
                    z.string(),
                ])
                .optional(),
        })
        .strict()

export const ChoreCompletionScalarWhereWithAggregatesInputObjectSchema = Schema
