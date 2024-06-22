import { z } from "zod"
import { HomeUpdateWithoutChoresInputObjectSchema } from "./HomeUpdateWithoutChoresInput.schema"
import { HomeUncheckedUpdateWithoutChoresInputObjectSchema } from "./HomeUncheckedUpdateWithoutChoresInput.schema"
import { HomeCreateWithoutChoresInputObjectSchema } from "./HomeCreateWithoutChoresInput.schema"
import { HomeUncheckedCreateWithoutChoresInputObjectSchema } from "./HomeUncheckedCreateWithoutChoresInput.schema"

import type { Prisma } from "@prisma/client"

const Schema: z.ZodType<Prisma.HomeUpsertWithoutChoresInput> = z
    .object({
        update: z.union([
            z.lazy(() => HomeUpdateWithoutChoresInputObjectSchema),
            z.lazy(() => HomeUncheckedUpdateWithoutChoresInputObjectSchema),
        ]),
        create: z.union([
            z.lazy(() => HomeCreateWithoutChoresInputObjectSchema),
            z.lazy(() => HomeUncheckedCreateWithoutChoresInputObjectSchema),
        ]),
    })
    .strict()

export const HomeUpsertWithoutChoresInputObjectSchema = Schema
