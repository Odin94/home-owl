import { z } from "zod"
import { UserWhereUniqueInputObjectSchema } from "./UserWhereUniqueInput.schema"
import { UserUpdateWithoutHomeInputObjectSchema } from "./UserUpdateWithoutHomeInput.schema"
import { UserUncheckedUpdateWithoutHomeInputObjectSchema } from "./UserUncheckedUpdateWithoutHomeInput.schema"
import { UserCreateWithoutHomeInputObjectSchema } from "./UserCreateWithoutHomeInput.schema"
import { UserUncheckedCreateWithoutHomeInputObjectSchema } from "./UserUncheckedCreateWithoutHomeInput.schema"

import type { Prisma } from "@prisma/client"

const Schema: z.ZodType<Prisma.UserUpsertWithWhereUniqueWithoutHomeInput> = z
    .object({
        where: z.lazy(() => UserWhereUniqueInputObjectSchema),
        update: z.union([
            z.lazy(() => UserUpdateWithoutHomeInputObjectSchema),
            z.lazy(() => UserUncheckedUpdateWithoutHomeInputObjectSchema),
        ]),
        create: z.union([
            z.lazy(() => UserCreateWithoutHomeInputObjectSchema),
            z.lazy(() => UserUncheckedCreateWithoutHomeInputObjectSchema),
        ]),
    })
    .strict()

export const UserUpsertWithWhereUniqueWithoutHomeInputObjectSchema = Schema
