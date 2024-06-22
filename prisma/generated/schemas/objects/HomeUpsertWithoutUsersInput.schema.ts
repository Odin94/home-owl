import { z } from "zod"
import { HomeUpdateWithoutUsersInputObjectSchema } from "./HomeUpdateWithoutUsersInput.schema"
import { HomeUncheckedUpdateWithoutUsersInputObjectSchema } from "./HomeUncheckedUpdateWithoutUsersInput.schema"
import { HomeCreateWithoutUsersInputObjectSchema } from "./HomeCreateWithoutUsersInput.schema"
import { HomeUncheckedCreateWithoutUsersInputObjectSchema } from "./HomeUncheckedCreateWithoutUsersInput.schema"

import type { Prisma } from "@prisma/client"

const Schema: z.ZodType<Prisma.HomeUpsertWithoutUsersInput> = z
    .object({
        update: z.union([
            z.lazy(() => HomeUpdateWithoutUsersInputObjectSchema),
            z.lazy(() => HomeUncheckedUpdateWithoutUsersInputObjectSchema),
        ]),
        create: z.union([
            z.lazy(() => HomeCreateWithoutUsersInputObjectSchema),
            z.lazy(() => HomeUncheckedCreateWithoutUsersInputObjectSchema),
        ]),
    })
    .strict()

export const HomeUpsertWithoutUsersInputObjectSchema = Schema
