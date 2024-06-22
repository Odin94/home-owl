import { z } from "zod"
import { StringFilterObjectSchema } from "./StringFilter.schema"
import { DateTimeFilterObjectSchema } from "./DateTimeFilter.schema"
import { UserListRelationFilterObjectSchema } from "./UserListRelationFilter.schema"
import { ChoreListRelationFilterObjectSchema } from "./ChoreListRelationFilter.schema"

import type { Prisma } from "@prisma/client"

const Schema: z.ZodType<Prisma.HomeWhereInput> = z
    .object({
        AND: z
            .union([
                z.lazy(() => HomeWhereInputObjectSchema),
                z.lazy(() => HomeWhereInputObjectSchema).array(),
            ])
            .optional(),
        OR: z
            .lazy(() => HomeWhereInputObjectSchema)
            .array()
            .optional(),
        NOT: z
            .union([
                z.lazy(() => HomeWhereInputObjectSchema),
                z.lazy(() => HomeWhereInputObjectSchema).array(),
            ])
            .optional(),
        id: z
            .union([z.lazy(() => StringFilterObjectSchema), z.string()])
            .optional(),
        createdAt: z
            .union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()])
            .optional(),
        users: z.lazy(() => UserListRelationFilterObjectSchema).optional(),
        chores: z.lazy(() => ChoreListRelationFilterObjectSchema).optional(),
    })
    .strict()

export const HomeWhereInputObjectSchema = Schema
