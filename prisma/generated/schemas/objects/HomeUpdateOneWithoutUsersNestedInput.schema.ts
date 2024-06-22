import { z } from "zod"
import { HomeCreateWithoutUsersInputObjectSchema } from "./HomeCreateWithoutUsersInput.schema"
import { HomeUncheckedCreateWithoutUsersInputObjectSchema } from "./HomeUncheckedCreateWithoutUsersInput.schema"
import { HomeCreateOrConnectWithoutUsersInputObjectSchema } from "./HomeCreateOrConnectWithoutUsersInput.schema"
import { HomeUpsertWithoutUsersInputObjectSchema } from "./HomeUpsertWithoutUsersInput.schema"
import { HomeWhereUniqueInputObjectSchema } from "./HomeWhereUniqueInput.schema"
import { HomeUpdateWithoutUsersInputObjectSchema } from "./HomeUpdateWithoutUsersInput.schema"
import { HomeUncheckedUpdateWithoutUsersInputObjectSchema } from "./HomeUncheckedUpdateWithoutUsersInput.schema"

import type { Prisma } from "@prisma/client"

const Schema: z.ZodType<Prisma.HomeUpdateOneWithoutUsersNestedInput> = z
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
        upsert: z
            .lazy(() => HomeUpsertWithoutUsersInputObjectSchema)
            .optional(),
        disconnect: z.boolean().optional(),
        delete: z.boolean().optional(),
        connect: z.lazy(() => HomeWhereUniqueInputObjectSchema).optional(),
        update: z
            .union([
                z.lazy(() => HomeUpdateWithoutUsersInputObjectSchema),
                z.lazy(() => HomeUncheckedUpdateWithoutUsersInputObjectSchema),
            ])
            .optional(),
    })
    .strict()

export const HomeUpdateOneWithoutUsersNestedInputObjectSchema = Schema
