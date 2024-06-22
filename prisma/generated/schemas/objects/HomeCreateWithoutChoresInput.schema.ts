import { z } from "zod"
import { UserCreateNestedManyWithoutHomeInputObjectSchema } from "./UserCreateNestedManyWithoutHomeInput.schema"

import type { Prisma } from "@prisma/client"

const Schema: z.ZodType<Prisma.HomeCreateWithoutChoresInput> = z
    .object({
        id: z.string().optional(),
        createdAt: z.coerce.date().optional(),
        users: z
            .lazy(() => UserCreateNestedManyWithoutHomeInputObjectSchema)
            .optional(),
    })
    .strict()

export const HomeCreateWithoutChoresInputObjectSchema = Schema
