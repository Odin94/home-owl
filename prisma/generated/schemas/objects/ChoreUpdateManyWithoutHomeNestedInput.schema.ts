import { z } from "zod"
import { ChoreCreateWithoutHomeInputObjectSchema } from "./ChoreCreateWithoutHomeInput.schema"
import { ChoreUncheckedCreateWithoutHomeInputObjectSchema } from "./ChoreUncheckedCreateWithoutHomeInput.schema"
import { ChoreCreateOrConnectWithoutHomeInputObjectSchema } from "./ChoreCreateOrConnectWithoutHomeInput.schema"
import { ChoreUpsertWithWhereUniqueWithoutHomeInputObjectSchema } from "./ChoreUpsertWithWhereUniqueWithoutHomeInput.schema"
import { ChoreCreateManyHomeInputEnvelopeObjectSchema } from "./ChoreCreateManyHomeInputEnvelope.schema"
import { ChoreWhereUniqueInputObjectSchema } from "./ChoreWhereUniqueInput.schema"
import { ChoreUpdateWithWhereUniqueWithoutHomeInputObjectSchema } from "./ChoreUpdateWithWhereUniqueWithoutHomeInput.schema"
import { ChoreUpdateManyWithWhereWithoutHomeInputObjectSchema } from "./ChoreUpdateManyWithWhereWithoutHomeInput.schema"
import { ChoreScalarWhereInputObjectSchema } from "./ChoreScalarWhereInput.schema"

import type { Prisma } from "@prisma/client"

const Schema: z.ZodType<Prisma.ChoreUpdateManyWithoutHomeNestedInput> = z
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
        upsert: z
            .union([
                z.lazy(
                    () => ChoreUpsertWithWhereUniqueWithoutHomeInputObjectSchema
                ),
                z
                    .lazy(
                        () =>
                            ChoreUpsertWithWhereUniqueWithoutHomeInputObjectSchema
                    )
                    .array(),
            ])
            .optional(),
        createMany: z
            .lazy(() => ChoreCreateManyHomeInputEnvelopeObjectSchema)
            .optional(),
        set: z
            .union([
                z.lazy(() => ChoreWhereUniqueInputObjectSchema),
                z.lazy(() => ChoreWhereUniqueInputObjectSchema).array(),
            ])
            .optional(),
        disconnect: z
            .union([
                z.lazy(() => ChoreWhereUniqueInputObjectSchema),
                z.lazy(() => ChoreWhereUniqueInputObjectSchema).array(),
            ])
            .optional(),
        delete: z
            .union([
                z.lazy(() => ChoreWhereUniqueInputObjectSchema),
                z.lazy(() => ChoreWhereUniqueInputObjectSchema).array(),
            ])
            .optional(),
        connect: z
            .union([
                z.lazy(() => ChoreWhereUniqueInputObjectSchema),
                z.lazy(() => ChoreWhereUniqueInputObjectSchema).array(),
            ])
            .optional(),
        update: z
            .union([
                z.lazy(
                    () => ChoreUpdateWithWhereUniqueWithoutHomeInputObjectSchema
                ),
                z
                    .lazy(
                        () =>
                            ChoreUpdateWithWhereUniqueWithoutHomeInputObjectSchema
                    )
                    .array(),
            ])
            .optional(),
        updateMany: z
            .union([
                z.lazy(
                    () => ChoreUpdateManyWithWhereWithoutHomeInputObjectSchema
                ),
                z
                    .lazy(
                        () =>
                            ChoreUpdateManyWithWhereWithoutHomeInputObjectSchema
                    )
                    .array(),
            ])
            .optional(),
        deleteMany: z
            .union([
                z.lazy(() => ChoreScalarWhereInputObjectSchema),
                z.lazy(() => ChoreScalarWhereInputObjectSchema).array(),
            ])
            .optional(),
    })
    .strict()

export const ChoreUpdateManyWithoutHomeNestedInputObjectSchema = Schema
