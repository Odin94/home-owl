import { z } from "zod"
import { ChoreCompletionCreateWithoutChoreInputObjectSchema } from "./ChoreCompletionCreateWithoutChoreInput.schema"
import { ChoreCompletionUncheckedCreateWithoutChoreInputObjectSchema } from "./ChoreCompletionUncheckedCreateWithoutChoreInput.schema"
import { ChoreCompletionCreateOrConnectWithoutChoreInputObjectSchema } from "./ChoreCompletionCreateOrConnectWithoutChoreInput.schema"
import { ChoreCompletionCreateManyChoreInputEnvelopeObjectSchema } from "./ChoreCompletionCreateManyChoreInputEnvelope.schema"
import { ChoreCompletionWhereUniqueInputObjectSchema } from "./ChoreCompletionWhereUniqueInput.schema"

import type { Prisma } from "@prisma/client"

const Schema: z.ZodType<Prisma.ChoreCompletionUncheckedCreateNestedManyWithoutChoreInput> =
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
            createMany: z
                .lazy(
                    () =>
                        ChoreCompletionCreateManyChoreInputEnvelopeObjectSchema
                )
                .optional(),
            connect: z
                .union([
                    z.lazy(() => ChoreCompletionWhereUniqueInputObjectSchema),
                    z
                        .lazy(() => ChoreCompletionWhereUniqueInputObjectSchema)
                        .array(),
                ])
                .optional(),
        })
        .strict()

export const ChoreCompletionUncheckedCreateNestedManyWithoutChoreInputObjectSchema =
    Schema
