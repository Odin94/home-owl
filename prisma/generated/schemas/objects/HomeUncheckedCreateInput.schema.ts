import { z } from "zod"
import { UserUncheckedCreateNestedManyWithoutHomeInputObjectSchema } from "./UserUncheckedCreateNestedManyWithoutHomeInput.schema"
import { ChoreUncheckedCreateNestedManyWithoutHomeInputObjectSchema } from "./ChoreUncheckedCreateNestedManyWithoutHomeInput.schema"

import type { Prisma } from "@prisma/client"

const Schema: z.ZodType<Prisma.HomeUncheckedCreateInput> = z
    .object({
        id: z.string().optional(),
        createdAt: z.coerce.date().optional(),
        users: z
            .lazy(
                () => UserUncheckedCreateNestedManyWithoutHomeInputObjectSchema
            )
            .optional(),
        chores: z
            .lazy(
                () => ChoreUncheckedCreateNestedManyWithoutHomeInputObjectSchema
            )
            .optional(),
    })
    .strict()

export const HomeUncheckedCreateInputObjectSchema = Schema
