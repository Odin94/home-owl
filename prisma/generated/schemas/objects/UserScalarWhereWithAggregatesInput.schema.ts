import { z } from "zod"
import { StringWithAggregatesFilterObjectSchema } from "./StringWithAggregatesFilter.schema"
import { StringNullableWithAggregatesFilterObjectSchema } from "./StringNullableWithAggregatesFilter.schema"
import { DateTimeNullableWithAggregatesFilterObjectSchema } from "./DateTimeNullableWithAggregatesFilter.schema"
import { IntWithAggregatesFilterObjectSchema } from "./IntWithAggregatesFilter.schema"

import type { Prisma } from "@prisma/client"

const Schema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> = z
    .object({
        AND: z
            .union([
                z.lazy(() => UserScalarWhereWithAggregatesInputObjectSchema),
                z
                    .lazy(() => UserScalarWhereWithAggregatesInputObjectSchema)
                    .array(),
            ])
            .optional(),
        OR: z
            .lazy(() => UserScalarWhereWithAggregatesInputObjectSchema)
            .array()
            .optional(),
        NOT: z
            .union([
                z.lazy(() => UserScalarWhereWithAggregatesInputObjectSchema),
                z
                    .lazy(() => UserScalarWhereWithAggregatesInputObjectSchema)
                    .array(),
            ])
            .optional(),
        id: z
            .union([
                z.lazy(() => StringWithAggregatesFilterObjectSchema),
                z.string(),
            ])
            .optional(),
        name: z
            .union([
                z.lazy(() => StringNullableWithAggregatesFilterObjectSchema),
                z.string(),
            ])
            .optional()
            .nullable(),
        email: z
            .union([
                z.lazy(() => StringNullableWithAggregatesFilterObjectSchema),
                z.string(),
            ])
            .optional()
            .nullable(),
        emailVerified: z
            .union([
                z.lazy(() => DateTimeNullableWithAggregatesFilterObjectSchema),
                z.coerce.date(),
            ])
            .optional()
            .nullable(),
        imageUrl: z
            .union([
                z.lazy(() => StringNullableWithAggregatesFilterObjectSchema),
                z.string(),
            ])
            .optional()
            .nullable(),
        clerkUserId: z
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
        homeId: z
            .union([
                z.lazy(() => StringNullableWithAggregatesFilterObjectSchema),
                z.string(),
            ])
            .optional()
            .nullable(),
    })
    .strict()

export const UserScalarWhereWithAggregatesInputObjectSchema = Schema
