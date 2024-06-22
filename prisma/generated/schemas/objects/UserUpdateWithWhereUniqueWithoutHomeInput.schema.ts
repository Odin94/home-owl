import { z } from "zod"
import { UserWhereUniqueInputObjectSchema } from "./UserWhereUniqueInput.schema"
import { UserUpdateWithoutHomeInputObjectSchema } from "./UserUpdateWithoutHomeInput.schema"
import { UserUncheckedUpdateWithoutHomeInputObjectSchema } from "./UserUncheckedUpdateWithoutHomeInput.schema"

import type { Prisma } from "@prisma/client"

const Schema: z.ZodType<Prisma.UserUpdateWithWhereUniqueWithoutHomeInput> = z
    .object({
        where: z.lazy(() => UserWhereUniqueInputObjectSchema),
        data: z.union([
            z.lazy(() => UserUpdateWithoutHomeInputObjectSchema),
            z.lazy(() => UserUncheckedUpdateWithoutHomeInputObjectSchema),
        ]),
    })
    .strict()

export const UserUpdateWithWhereUniqueWithoutHomeInputObjectSchema = Schema
