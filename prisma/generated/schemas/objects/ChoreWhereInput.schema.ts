import { z } from "zod"
import { StringFilterObjectSchema } from "./StringFilter.schema"
import { DateTimeFilterObjectSchema } from "./DateTimeFilter.schema"
import { IntFilterObjectSchema } from "./IntFilter.schema"
import { BoolFilterObjectSchema } from "./BoolFilter.schema"
import { HomeRelationFilterObjectSchema } from "./HomeRelationFilter.schema"
import { HomeWhereInputObjectSchema } from "./HomeWhereInput.schema"
import { ChoreCompletionListRelationFilterObjectSchema } from "./ChoreCompletionListRelationFilter.schema"

import type { Prisma } from "@prisma/client"

const Schema: z.ZodType<Prisma.ChoreWhereInput> = z
    .object({
        AND: z
            .union([
                z.lazy(() => ChoreWhereInputObjectSchema),
                z.lazy(() => ChoreWhereInputObjectSchema).array(),
            ])
            .optional(),
        OR: z
            .lazy(() => ChoreWhereInputObjectSchema)
            .array()
            .optional(),
        NOT: z
            .union([
                z.lazy(() => ChoreWhereInputObjectSchema),
                z.lazy(() => ChoreWhereInputObjectSchema).array(),
            ])
            .optional(),
        id: z
            .union([z.lazy(() => StringFilterObjectSchema), z.string()])
            .optional(),
        createdAt: z
            .union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()])
            .optional(),
        name: z
            .union([z.lazy(() => StringFilterObjectSchema), z.string()])
            .optional(),
        description: z
            .union([z.lazy(() => StringFilterObjectSchema), z.string()])
            .optional(),
        points: z
            .union([z.lazy(() => IntFilterObjectSchema), z.number()])
            .optional(),
        shouldRepeat: z
            .union([z.lazy(() => BoolFilterObjectSchema), z.boolean()])
            .optional(),
        repeatIntervalMinutes: z
            .union([z.lazy(() => IntFilterObjectSchema), z.number()])
            .optional(),
        deadline: z
            .union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()])
            .optional(),
        homeId: z
            .union([z.lazy(() => StringFilterObjectSchema), z.string()])
            .optional(),
        home: z
            .union([
                z.lazy(() => HomeRelationFilterObjectSchema),
                z.lazy(() => HomeWhereInputObjectSchema),
            ])
            .optional(),
        choreCompletions: z
            .lazy(() => ChoreCompletionListRelationFilterObjectSchema)
            .optional(),
    })
    .strict()

export const ChoreWhereInputObjectSchema = Schema
