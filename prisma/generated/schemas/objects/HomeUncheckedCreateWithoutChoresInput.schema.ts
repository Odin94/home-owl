import { z } from "zod"
import { UserUncheckedCreateNestedManyWithoutHomeInputObjectSchema } from "./UserUncheckedCreateNestedManyWithoutHomeInput.schema"

import type { Prisma } from "@prisma/client"

const Schema: z.ZodType<Prisma.HomeUncheckedCreateWithoutChoresInput> = z
    .object({
        id: z.string().optional(),
        createdAt: z.coerce.date().optional(),
        users: z
            .lazy(
                () => UserUncheckedCreateNestedManyWithoutHomeInputObjectSchema
            )
            .optional(),
    })
    .strict()

export const HomeUncheckedCreateWithoutChoresInputObjectSchema = Schema
