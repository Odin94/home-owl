import { z } from "zod"
import { HomeCreateWithoutUsersInputObjectSchema } from "./HomeCreateWithoutUsersInput.schema"
import { HomeUncheckedCreateWithoutUsersInputObjectSchema } from "./HomeUncheckedCreateWithoutUsersInput.schema"
import { HomeCreateOrConnectWithoutUsersInputObjectSchema } from "./HomeCreateOrConnectWithoutUsersInput.schema"
import { HomeWhereUniqueInputObjectSchema } from "./HomeWhereUniqueInput.schema"

import type { Prisma } from "@prisma/client"

const Schema: z.ZodType<Prisma.HomeCreateNestedOneWithoutUsersInput> = z
    .object({
        create: z
            .union([
                z.lazy(() => HomeCreateWithoutUsersInputObjectSchema),
                z.lazy(() => HomeUncheckedCreateWithoutUsersInputObjectSchema),
            ])
            .optional(),
        connectOrCreate: z
            .lazy(() => HomeCreateOrConnectWithoutUsersInputObjectSchema)
            .optional(),
        connect: z.lazy(() => HomeWhereUniqueInputObjectSchema).optional(),
    })
    .strict()

export const HomeCreateNestedOneWithoutUsersInputObjectSchema = Schema
