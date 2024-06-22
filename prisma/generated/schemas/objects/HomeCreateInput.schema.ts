import { z } from "zod"
import { UserCreateNestedManyWithoutHomeInputObjectSchema } from "./UserCreateNestedManyWithoutHomeInput.schema"
import { ChoreCreateNestedManyWithoutHomeInputObjectSchema } from "./ChoreCreateNestedManyWithoutHomeInput.schema"

import type { Prisma } from "@prisma/client"

const Schema: z.ZodType<Prisma.HomeCreateInput> = z
    .object({
        id: z.string().optional(),
        createdAt: z.coerce.date().optional(),
        users: z
            .lazy(() => UserCreateNestedManyWithoutHomeInputObjectSchema)
            .optional(),
        chores: z
            .lazy(() => ChoreCreateNestedManyWithoutHomeInputObjectSchema)
            .optional(),
    })
    .strict()

export const HomeCreateInputObjectSchema = Schema
