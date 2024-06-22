import { z } from "zod"
import { StringFilterObjectSchema } from "./StringFilter.schema"
import { StringNullableFilterObjectSchema } from "./StringNullableFilter.schema"
import { DateTimeNullableFilterObjectSchema } from "./DateTimeNullableFilter.schema"
import { IntFilterObjectSchema } from "./IntFilter.schema"
import { AccountListRelationFilterObjectSchema } from "./AccountListRelationFilter.schema"
import { SessionListRelationFilterObjectSchema } from "./SessionListRelationFilter.schema"
import { ChoreCompletionListRelationFilterObjectSchema } from "./ChoreCompletionListRelationFilter.schema"
import { HomeRelationFilterObjectSchema } from "./HomeRelationFilter.schema"
import { HomeWhereInputObjectSchema } from "./HomeWhereInput.schema"

import type { Prisma } from "@prisma/client"

const Schema: z.ZodType<Prisma.UserWhereInput> = z
    .object({
        AND: z
            .union([
                z.lazy(() => UserWhereInputObjectSchema),
                z.lazy(() => UserWhereInputObjectSchema).array(),
            ])
            .optional(),
        OR: z
            .lazy(() => UserWhereInputObjectSchema)
            .array()
            .optional(),
        NOT: z
            .union([
                z.lazy(() => UserWhereInputObjectSchema),
                z.lazy(() => UserWhereInputObjectSchema).array(),
            ])
            .optional(),
        id: z
            .union([z.lazy(() => StringFilterObjectSchema), z.string()])
            .optional(),
        name: z
            .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
            .optional()
            .nullable(),
        email: z
            .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
            .optional()
            .nullable(),
        emailVerified: z
            .union([
                z.lazy(() => DateTimeNullableFilterObjectSchema),
                z.coerce.date(),
            ])
            .optional()
            .nullable(),
        imageUrl: z
            .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
            .optional()
            .nullable(),
        clerkUserId: z
            .union([z.lazy(() => StringFilterObjectSchema), z.string()])
            .optional(),
        points: z
            .union([z.lazy(() => IntFilterObjectSchema), z.number()])
            .optional(),
        homeId: z
            .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
            .optional()
            .nullable(),
        accounts: z
            .lazy(() => AccountListRelationFilterObjectSchema)
            .optional(),
        sessions: z
            .lazy(() => SessionListRelationFilterObjectSchema)
            .optional(),
        choreCompletions: z
            .lazy(() => ChoreCompletionListRelationFilterObjectSchema)
            .optional(),
        home: z
            .union([
                z.lazy(() => HomeRelationFilterObjectSchema),
                z.lazy(() => HomeWhereInputObjectSchema),
            ])
            .optional()
            .nullable(),
    })
    .strict()

export const UserWhereInputObjectSchema = Schema
