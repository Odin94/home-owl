import { z } from "zod"
import { HomeWhereUniqueInputObjectSchema } from "./HomeWhereUniqueInput.schema"
import { HomeCreateWithoutUsersInputObjectSchema } from "./HomeCreateWithoutUsersInput.schema"
import { HomeUncheckedCreateWithoutUsersInputObjectSchema } from "./HomeUncheckedCreateWithoutUsersInput.schema"

import type { Prisma } from "@prisma/client"

const Schema: z.ZodType<Prisma.HomeCreateOrConnectWithoutUsersInput> = z
    .object({
        where: z.lazy(() => HomeWhereUniqueInputObjectSchema),
        create: z.union([
            z.lazy(() => HomeCreateWithoutUsersInputObjectSchema),
            z.lazy(() => HomeUncheckedCreateWithoutUsersInputObjectSchema),
        ]),
    })
    .strict()

export const HomeCreateOrConnectWithoutUsersInputObjectSchema = Schema
