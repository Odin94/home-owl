import { z } from "zod"
import { HomeCreateWithoutChoresInputObjectSchema } from "./HomeCreateWithoutChoresInput.schema"
import { HomeUncheckedCreateWithoutChoresInputObjectSchema } from "./HomeUncheckedCreateWithoutChoresInput.schema"
import { HomeCreateOrConnectWithoutChoresInputObjectSchema } from "./HomeCreateOrConnectWithoutChoresInput.schema"
import { HomeWhereUniqueInputObjectSchema } from "./HomeWhereUniqueInput.schema"

import type { Prisma } from "@prisma/client"

const Schema: z.ZodType<Prisma.HomeCreateNestedOneWithoutChoresInput> = z
    .object({
        create: z
            .union([
                z.lazy(() => HomeCreateWithoutChoresInputObjectSchema),
                z.lazy(() => HomeUncheckedCreateWithoutChoresInputObjectSchema),
            ])
            .optional(),
        connectOrCreate: z
            .lazy(() => HomeCreateOrConnectWithoutChoresInputObjectSchema)
            .optional(),
        connect: z.lazy(() => HomeWhereUniqueInputObjectSchema).optional(),
    })
    .strict()

export const HomeCreateNestedOneWithoutChoresInputObjectSchema = Schema
