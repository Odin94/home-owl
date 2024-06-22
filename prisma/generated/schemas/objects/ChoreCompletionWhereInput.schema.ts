import { z } from "zod"
import { StringFilterObjectSchema } from "./StringFilter.schema"
import { DateTimeFilterObjectSchema } from "./DateTimeFilter.schema"
import { StringNullableFilterObjectSchema } from "./StringNullableFilter.schema"
import { IntFilterObjectSchema } from "./IntFilter.schema"
import { ChoreRelationFilterObjectSchema } from "./ChoreRelationFilter.schema"
import { ChoreWhereInputObjectSchema } from "./ChoreWhereInput.schema"
import { UserRelationFilterObjectSchema } from "./UserRelationFilter.schema"
import { UserWhereInputObjectSchema } from "./UserWhereInput.schema"

import type { Prisma } from "@prisma/client"

const Schema: z.ZodType<Prisma.ChoreCompletionWhereInput> = z
    .object({
        AND: z
            .union([
                z.lazy(() => ChoreCompletionWhereInputObjectSchema),
                z.lazy(() => ChoreCompletionWhereInputObjectSchema).array(),
            ])
            .optional(),
        OR: z
            .lazy(() => ChoreCompletionWhereInputObjectSchema)
            .array()
            .optional(),
        NOT: z
            .union([
                z.lazy(() => ChoreCompletionWhereInputObjectSchema),
                z.lazy(() => ChoreCompletionWhereInputObjectSchema).array(),
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
        chore: z
            .union([
                z.lazy(() => ChoreRelationFilterObjectSchema),
                z.lazy(() => ChoreWhereInputObjectSchema),
            ])
            .optional()
            .nullable(),
        completedByUser: z
            .union([
                z.lazy(() => UserRelationFilterObjectSchema),
                z.lazy(() => UserWhereInputObjectSchema),
            ])
            .optional(),
    })
    .strict()

export const ChoreCompletionWhereInputObjectSchema = Schema
