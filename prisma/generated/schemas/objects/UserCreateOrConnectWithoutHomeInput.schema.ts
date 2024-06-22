import { z } from "zod"
import { UserWhereUniqueInputObjectSchema } from "./UserWhereUniqueInput.schema"
import { UserCreateWithoutHomeInputObjectSchema } from "./UserCreateWithoutHomeInput.schema"
import { UserUncheckedCreateWithoutHomeInputObjectSchema } from "./UserUncheckedCreateWithoutHomeInput.schema"

import type { Prisma } from "@prisma/client"

const Schema: z.ZodType<Prisma.UserCreateOrConnectWithoutHomeInput> = z
    .object({
        where: z.lazy(() => UserWhereUniqueInputObjectSchema),
        create: z.union([
            z.lazy(() => UserCreateWithoutHomeInputObjectSchema),
            z.lazy(() => UserUncheckedCreateWithoutHomeInputObjectSchema),
        ]),
    })
    .strict()

export const UserCreateOrConnectWithoutHomeInputObjectSchema = Schema
