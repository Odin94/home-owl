import { z } from "zod"
import { ChoreCompletionCreateWithoutCompletedByUserInputObjectSchema } from "./ChoreCompletionCreateWithoutCompletedByUserInput.schema"
import { ChoreCompletionUncheckedCreateWithoutCompletedByUserInputObjectSchema } from "./ChoreCompletionUncheckedCreateWithoutCompletedByUserInput.schema"
import { ChoreCompletionCreateOrConnectWithoutCompletedByUserInputObjectSchema } from "./ChoreCompletionCreateOrConnectWithoutCompletedByUserInput.schema"
import { ChoreCompletionUpsertWithWhereUniqueWithoutCompletedByUserInputObjectSchema } from "./ChoreCompletionUpsertWithWhereUniqueWithoutCompletedByUserInput.schema"
import { ChoreCompletionCreateManyCompletedByUserInputEnvelopeObjectSchema } from "./ChoreCompletionCreateManyCompletedByUserInputEnvelope.schema"
import { ChoreCompletionWhereUniqueInputObjectSchema } from "./ChoreCompletionWhereUniqueInput.schema"
import { ChoreCompletionUpdateWithWhereUniqueWithoutCompletedByUserInputObjectSchema } from "./ChoreCompletionUpdateWithWhereUniqueWithoutCompletedByUserInput.schema"
import { ChoreCompletionUpdateManyWithWhereWithoutCompletedByUserInputObjectSchema } from "./ChoreCompletionUpdateManyWithWhereWithoutCompletedByUserInput.schema"
import { ChoreCompletionScalarWhereInputObjectSchema } from "./ChoreCompletionScalarWhereInput.schema"

import type { Prisma } from "@prisma/client"

const Schema: z.ZodType<Prisma.ChoreCompletionUncheckedUpdateManyWithoutCompletedByUserNestedInput> =
    z
        .object({
            create: z
                .union([
                    z.lazy(
                        () =>
                            ChoreCompletionCreateWithoutCompletedByUserInputObjectSchema
                    ),
                    z
                        .lazy(
                            () =>
                                ChoreCompletionCreateWithoutCompletedByUserInputObjectSchema
                        )
                        .array(),
                    z.lazy(
                        () =>
                            ChoreCompletionUncheckedCreateWithoutCompletedByUserInputObjectSchema
                    ),
                    z
                        .lazy(
                            () =>
                                ChoreCompletionUncheckedCreateWithoutCompletedByUserInputObjectSchema
                        )
                        .array(),
                ])
                .optional(),
            connectOrCreate: z
                .union([
                    z.lazy(
                        () =>
                            ChoreCompletionCreateOrConnectWithoutCompletedByUserInputObjectSchema
                    ),
                    z
                        .lazy(
                            () =>
                                ChoreCompletionCreateOrConnectWithoutCompletedByUserInputObjectSchema
                        )
                        .array(),
                ])
                .optional(),
            upsert: z
                .union([
                    z.lazy(
                        () =>
                            ChoreCompletionUpsertWithWhereUniqueWithoutCompletedByUserInputObjectSchema
                    ),
                    z
                        .lazy(
                            () =>
                                ChoreCompletionUpsertWithWhereUniqueWithoutCompletedByUserInputObjectSchema
                        )
                        .array(),
                ])
                .optional(),
            createMany: z
                .lazy(
                    () =>
                        ChoreCompletionCreateManyCompletedByUserInputEnvelopeObjectSchema
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
                            ChoreCompletionUpdateWithWhereUniqueWithoutCompletedByUserInputObjectSchema
                    ),
                    z
                        .lazy(
                            () =>
                                ChoreCompletionUpdateWithWhereUniqueWithoutCompletedByUserInputObjectSchema
                        )
                        .array(),
                ])
                .optional(),
            updateMany: z
                .union([
                    z.lazy(
                        () =>
                            ChoreCompletionUpdateManyWithWhereWithoutCompletedByUserInputObjectSchema
                    ),
                    z
                        .lazy(
                            () =>
                                ChoreCompletionUpdateManyWithWhereWithoutCompletedByUserInputObjectSchema
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

export const ChoreCompletionUncheckedUpdateManyWithoutCompletedByUserNestedInputObjectSchema =
    Schema
