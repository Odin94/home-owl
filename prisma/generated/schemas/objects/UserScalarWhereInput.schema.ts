import { z } from "zod"
import { StringFilterObjectSchema } from "./StringFilter.schema"
import { StringNullableFilterObjectSchema } from "./StringNullableFilter.schema"
import { DateTimeNullableFilterObjectSchema } from "./DateTimeNullableFilter.schema"
import { IntFilterObjectSchema } from "./IntFilter.schema"

import type { Prisma } from "@prisma/client"

const Schema: z.ZodType<Prisma.UserScalarWhereInput> = z
    .object({
        AND: z
            .union([
                z.lazy(() => UserScalarWhereInputObjectSchema),
                z.lazy(() => UserScalarWhereInputObjectSchema).array(),
            ])
            .optional(),
        OR: z
            .lazy(() => UserScalarWhereInputObjectSchema)
            .array()
            .optional(),
        NOT: z
            .union([
                z.lazy(() => UserScalarWhereInputObjectSchema),
                z.lazy(() => UserScalarWhereInputObjectSchema).array(),
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
    })
    .strict()

export const UserScalarWhereInputObjectSchema = Schema
