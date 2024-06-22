import { z } from "zod"
import { StringFilterObjectSchema } from "./StringFilter.schema"
import { DateTimeFilterObjectSchema } from "./DateTimeFilter.schema"
import { StringNullableFilterObjectSchema } from "./StringNullableFilter.schema"
import { IntFilterObjectSchema } from "./IntFilter.schema"

import type { Prisma } from "@prisma/client"

const Schema: z.ZodType<Prisma.ChoreCompletionScalarWhereInput> = z
    .object({
        AND: z
            .union([
                z.lazy(() => ChoreCompletionScalarWhereInputObjectSchema),
                z
                    .lazy(() => ChoreCompletionScalarWhereInputObjectSchema)
                    .array(),
            ])
            .optional(),
        OR: z
            .lazy(() => ChoreCompletionScalarWhereInputObjectSchema)
            .array()
            .optional(),
        NOT: z
            .union([
                z.lazy(() => ChoreCompletionScalarWhereInputObjectSchema),
                z
                    .lazy(() => ChoreCompletionScalarWhereInputObjectSchema)
                    .array(),
            ])
            .optional(),
        id: z
            .union([z.lazy(() => StringFilterObjectSchema), z.string()])
            .optional(),
        createdAt: z
            .union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()])
            .optional(),
        completedAt: z
            .union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()])
            .optional(),
        choreId: z
            .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
            .optional()
            .nullable(),
        choreName: z
            .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
            .optional()
            .nullable(),
        points: z
            .union([z.lazy(() => IntFilterObjectSchema), z.number()])
            .optional(),
        completedByUserId: z
            .union([z.lazy(() => StringFilterObjectSchema), z.string()])
            .optional(),
    })
    .strict()

export const ChoreCompletionScalarWhereInputObjectSchema = Schema
