import { z } from "zod"
import { HomeCreateWithoutChoresInputObjectSchema } from "./HomeCreateWithoutChoresInput.schema"
import { HomeUncheckedCreateWithoutChoresInputObjectSchema } from "./HomeUncheckedCreateWithoutChoresInput.schema"
import { HomeCreateOrConnectWithoutChoresInputObjectSchema } from "./HomeCreateOrConnectWithoutChoresInput.schema"
import { HomeUpsertWithoutChoresInputObjectSchema } from "./HomeUpsertWithoutChoresInput.schema"
import { HomeWhereUniqueInputObjectSchema } from "./HomeWhereUniqueInput.schema"
import { HomeUpdateWithoutChoresInputObjectSchema } from "./HomeUpdateWithoutChoresInput.schema"
import { HomeUncheckedUpdateWithoutChoresInputObjectSchema } from "./HomeUncheckedUpdateWithoutChoresInput.schema"

import type { Prisma } from "@prisma/client"

const Schema: z.ZodType<Prisma.HomeUpdateOneRequiredWithoutChoresNestedInput> =
    z
        .object({
            create: z
                .union([
                    z.lazy(() => HomeCreateWithoutChoresInputObjectSchema),
                    z.lazy(
                        () => HomeUncheckedCreateWithoutChoresInputObjectSchema
                    ),
                ])
                .optional(),
            connectOrCreate: z
                .lazy(() => HomeCreateOrConnectWithoutChoresInputObjectSchema)
                .optional(),
            upsert: z
                .lazy(() => HomeUpsertWithoutChoresInputObjectSchema)
                .optional(),
            connect: z.lazy(() => HomeWhereUniqueInputObjectSchema).optional(),
            update: z
                .union([
                    z.lazy(() => HomeUpdateWithoutChoresInputObjectSchema),
                    z.lazy(
                        () => HomeUncheckedUpdateWithoutChoresInputObjectSchema
                    ),
                ])
                .optional(),
        })
        .strict()

export const HomeUpdateOneRequiredWithoutChoresNestedInputObjectSchema = Schema
