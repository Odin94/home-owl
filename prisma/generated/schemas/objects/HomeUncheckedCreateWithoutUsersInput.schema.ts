import { z } from "zod"
import { ChoreUncheckedCreateNestedManyWithoutHomeInputObjectSchema } from "./ChoreUncheckedCreateNestedManyWithoutHomeInput.schema"

import type { Prisma } from "@prisma/client"

const Schema: z.ZodType<Prisma.HomeUncheckedCreateWithoutUsersInput> = z
    .object({
        id: z.string().optional(),
        createdAt: z.coerce.date().optional(),
        chores: z
            .lazy(
                () => ChoreUncheckedCreateNestedManyWithoutHomeInputObjectSchema
            )
            .optional(),
    })
    .strict()

export const HomeUncheckedCreateWithoutUsersInputObjectSchema = Schema
