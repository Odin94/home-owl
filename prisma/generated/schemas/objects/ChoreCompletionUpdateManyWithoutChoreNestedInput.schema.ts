import { z } from "zod"
import { ChoreCompletionCreateWithoutChoreInputObjectSchema } from "./ChoreCompletionCreateWithoutChoreInput.schema"
import { ChoreCompletionUncheckedCreateWithoutChoreInputObjectSchema } from "./ChoreCompletionUncheckedCreateWithoutChoreInput.schema"
import { ChoreCompletionCreateOrConnectWithoutChoreInputObjectSchema } from "./ChoreCompletionCreateOrConnectWithoutChoreInput.schema"
import { ChoreCompletionUpsertWithWhereUniqueWithoutChoreInputObjectSchema } from "./ChoreCompletionUpsertWithWhereUniqueWithoutChoreInput.schema"
import { ChoreCompletionCreateManyChoreInputEnvelopeObjectSchema } from "./ChoreCompletionCreateManyChoreInputEnvelope.schema"
import { ChoreCompletionWhereUniqueInputObjectSchema } from "./ChoreCompletionWhereUniqueInput.schema"
import { ChoreCompletionUpdateWithWhereUniqueWithoutChoreInputObjectSchema } from "./ChoreCompletionUpdateWithWhereUniqueWithoutChoreInput.schema"
import { ChoreCompletionUpdateManyWithWhereWithoutChoreInputObjectSchema } from "./ChoreCompletionUpdateManyWithWhereWithoutChoreInput.schema"
import { ChoreCompletionScalarWhereInputObjectSchema } from "./ChoreCompletionScalarWhereInput.schema"

import type { Prisma } from "@prisma/client"

const Schema: z.ZodType<Prisma.ChoreCompletionUpdateManyWithoutChoreNestedInput> =
    z
        .object({
            create: z
                .union([
                    z.lazy(
                        () => ChoreCompletionCreateWithoutChoreInputObjectSchema
                    ),
                    z
                        .lazy(
                            () =>
                                ChoreCompletionCreateWithoutChoreInputObjectSchema
                        )
                        .array(),
                    z.lazy(
                        () =>
                            ChoreCompletionUncheckedCreateWithoutChoreInputObjectSchema
                    ),
                    z
                        .lazy(
                            () =>
                                ChoreCompletionUncheckedCreateWithoutChoreInputObjectSchema
                        )
                        .array(),
                ])
                .optional(),
            connectOrCreate: z
                .union([
                    z.lazy(
                        () =>
                            ChoreCompletionCreateOrConnectWithoutChoreInputObjectSchema
                    ),
                    z
                        .lazy(
                            () =>
                                ChoreCompletionCreateOrConnectWithoutChoreInputObjectSchema
                        )
                        .array(),
                ])
                .optional(),
            upsert: z
                .union([
                    z.lazy(
                        () =>
                            ChoreCompletionUpsertWithWhereUniqueWithoutChoreInputObjectSchema
                    ),
                    z
                        .lazy(
                            () =>
                                ChoreCompletionUpsertWithWhereUniqueWithoutChoreInputObjectSchema
                        )
                        .array(),
                ])
                .optional(),
            createMany: z
                .lazy(
                    () =>
                        ChoreCompletionCreateManyChoreInputEnvelopeObjectSchema
                )
                .optional(),
            set: z
                .union([
                    z.lazy(() => ChoreCompletionWhereUniqueInputObjectSchema),
                    z
                        .lazy(() => ChoreCompletionWhereUniqueInputObjectSchema)
                        .array(),
                ])
                .optional(),
            disconnect: z
                .union([
                    z.lazy(() => ChoreCompletionWhereUniqueInputObjectSchema),
                    z
                        .lazy(() => ChoreCompletionWhereUniqueInputObjectSchema)
                        .array(),
                ])
                .optional(),
            delete: z
                .union([
                    z.lazy(() => ChoreCompletionWhereUniqueInputObjectSchema),
                    z
                        .lazy(() => ChoreCompletionWhereUniqueInputObjectSchema)
                        .array(),
                ])
                .optional(),
            connect: z
                .union([
                    z.lazy(() => ChoreCompletionWhereUniqueInputObjectSchema),
                    z
                        .lazy(() => ChoreCompletionWhereUniqueInputObjectSchema)
                        .array(),
                ])
                .optional(),
            update: z
                .union([
                    z.lazy(
                        () =>
                            ChoreCompletionUpdateWithWhereUniqueWithoutChoreInputObjectSchema
                    ),
                    z
                        .lazy(
                            () =>
                                ChoreCompletionUpdateWithWhereUniqueWithoutChoreInputObjectSchema
                        )
                        .array(),
                ])
                .optional(),
            updateMany: z
                .union([
                    z.lazy(
                        () =>
                            ChoreCompletionUpdateManyWithWhereWithoutChoreInputObjectSchema
                    ),
                    z
                        .lazy(
                            () =>
                                ChoreCompletionUpdateManyWithWhereWithoutChoreInputObjectSchema
                        )
                        .array(),
                ])
                .optional(),
            deleteMany: z
                .union([
                    z.lazy(() => ChoreCompletionScalarWhereInputObjectSchema),
                    z
                        .lazy(() => ChoreCompletionScalarWhereInputObjectSchema)
                        .array(),
                ])
                .optional(),
        })
        .strict()

export const ChoreCompletionUpdateManyWithoutChoreNestedInputObjectSchema =
    Schema
