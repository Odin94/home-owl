import { z } from "zod"
import { HomeWhereUniqueInputObjectSchema } from "./HomeWhereUniqueInput.schema"
import { HomeCreateWithoutChoresInputObjectSchema } from "./HomeCreateWithoutChoresInput.schema"
import { HomeUncheckedCreateWithoutChoresInputObjectSchema } from "./HomeUncheckedCreateWithoutChoresInput.schema"

import type { Prisma } from "@prisma/client"

const Schema: z.ZodType<Prisma.HomeCreateOrConnectWithoutChoresInput> = z
    .object({
        where: z.lazy(() => HomeWhereUniqueInputObjectSchema),
        create: z.union([
            z.lazy(() => HomeCreateWithoutChoresInputObjectSchema),
            z.lazy(() => HomeUncheckedCreateWithoutChoresInputObjectSchema),
        ]),
    })
    .strict()

export const HomeCreateOrConnectWithoutChoresInputObjectSchema = Schema
