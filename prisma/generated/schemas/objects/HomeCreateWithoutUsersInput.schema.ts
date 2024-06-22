import { z } from "zod"
import { ChoreCreateNestedManyWithoutHomeInputObjectSchema } from "./ChoreCreateNestedManyWithoutHomeInput.schema"

import type { Prisma } from "@prisma/client"

const Schema: z.ZodType<Prisma.HomeCreateWithoutUsersInput> = z
    .object({
        id: z.string().optional(),
        createdAt: z.coerce.date().optional(),
        chores: z
            .lazy(() => ChoreCreateNestedManyWithoutHomeInputObjectSchema)
            .optional(),
    })
    .strict()

export const HomeCreateWithoutUsersInputObjectSchema = Schema
