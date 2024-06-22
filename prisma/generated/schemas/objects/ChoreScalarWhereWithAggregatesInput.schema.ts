import { z } from "zod"
import { StringWithAggregatesFilterObjectSchema } from "./StringWithAggregatesFilter.schema"
import { DateTimeWithAggregatesFilterObjectSchema } from "./DateTimeWithAggregatesFilter.schema"
import { IntWithAggregatesFilterObjectSchema } from "./IntWithAggregatesFilter.schema"
import { BoolWithAggregatesFilterObjectSchema } from "./BoolWithAggregatesFilter.schema"

import type { Prisma } from "@prisma/client"

const Schema: z.ZodType<Prisma.ChoreScalarWhereWithAggregatesInput> = z
    .object({
        AND: z
            .union([
                z.lazy(() => ChoreScalarWhereWithAggregatesInputObjectSchema),
                z
                    .lazy(() => ChoreScalarWhereWithAggregatesInputObjectSchema)
                    .array(),
            ])
            .optional(),
        OR: z
            .lazy(() => ChoreScalarWhereWithAggregatesInputObjectSchema)
            .array()
            .optional(),
        NOT: z
            .union([
                z.lazy(() => ChoreScalarWhereWithAggregatesInputObjectSchema),
                z
                    .lazy(() => ChoreScalarWhereWithAggregatesInputObjectSchema)
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
        name: z
            .union([
                z.lazy(() => StringWithAggregatesFilterObjectSchema),
                z.string(),
            ])
            .optional(),
        description: z
            .union([
                z.lazy(() => StringWithAggregatesFilterObjectSchema),
                z.string(),
            ])
            .optional(),
        points: z
            .union([
                z.lazy(() => IntWithAggregatesFilterObjectSchema),
                z.number(),
            ])
            .optional(),
        shouldRepeat: z
            .union([
                z.lazy(() => BoolWithAggregatesFilterObjectSchema),
                z.boolean(),
            ])
            .optional(),
        repeatIntervalMinutes: z
            .union([
                z.lazy(() => IntWithAggregatesFilterObjectSchema),
                z.number(),
            ])
            .optional(),
        deadline: z
            .union([
                z.lazy(() => DateTimeWithAggregatesFilterObjectSchema),
                z.coerce.date(),
            ])
            .optional(),
        homeId: z
            .union([
                z.lazy(() => StringWithAggregatesFilterObjectSchema),
                z.string(),
            ])
            .optional(),
    })
    .strict()

export const ChoreScalarWhereWithAggregatesInputObjectSchema = Schema
