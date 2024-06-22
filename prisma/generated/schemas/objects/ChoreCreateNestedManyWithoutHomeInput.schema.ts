import { z } from "zod"
import { ChoreCreateWithoutHomeInputObjectSchema } from "./ChoreCreateWithoutHomeInput.schema"
import { ChoreUncheckedCreateWithoutHomeInputObjectSchema } from "./ChoreUncheckedCreateWithoutHomeInput.schema"
import { ChoreCreateOrConnectWithoutHomeInputObjectSchema } from "./ChoreCreateOrConnectWithoutHomeInput.schema"
import { ChoreCreateManyHomeInputEnvelopeObjectSchema } from "./ChoreCreateManyHomeInputEnvelope.schema"
import { ChoreWhereUniqueInputObjectSchema } from "./ChoreWhereUniqueInput.schema"

import type { Prisma } from "@prisma/client"

const Schema: z.ZodType<Prisma.ChoreCreateNestedManyWithoutHomeInput> = z
    .object({
        create: z
            .union([
                z.lazy(() => ChoreCreateWithoutHomeInputObjectSchema),
                z.lazy(() => ChoreCreateWithoutHomeInputObjectSchema).array(),
                z.lazy(() => ChoreUncheckedCreateWithoutHomeInputObjectSchema),
                z
                    .lazy(
                        () => ChoreUncheckedCreateWithoutHomeInputObjectSchema
                    )
                    .array(),
            ])
            .optional(),
        connectOrCreate: z
            .union([
                z.lazy(() => ChoreCreateOrConnectWithoutHomeInputObjectSchema),
                z
                    .lazy(
                        () => ChoreCreateOrConnectWithoutHomeInputObjectSchema
                    )
                    .array(),
            ])
            .optional(),
        createMany: z
            .lazy(() => ChoreCreateManyHomeInputEnvelopeObjectSchema)
            .optional(),
        connect: z
            .union([
                z.lazy(() => ChoreWhereUniqueInputObjectSchema),
                z.lazy(() => ChoreWhereUniqueInputObjectSchema).array(),
            ])
            .optional(),
    })
    .strict()

export const ChoreCreateNestedManyWithoutHomeInputObjectSchema = Schema
