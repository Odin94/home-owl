import { z } from "zod"
import { ChoreCompletionCreateWithoutCompletedByUserInputObjectSchema } from "./ChoreCompletionCreateWithoutCompletedByUserInput.schema"
import { ChoreCompletionUncheckedCreateWithoutCompletedByUserInputObjectSchema } from "./ChoreCompletionUncheckedCreateWithoutCompletedByUserInput.schema"
import { ChoreCompletionCreateOrConnectWithoutCompletedByUserInputObjectSchema } from "./ChoreCompletionCreateOrConnectWithoutCompletedByUserInput.schema"
import { ChoreCompletionCreateManyCompletedByUserInputEnvelopeObjectSchema } from "./ChoreCompletionCreateManyCompletedByUserInputEnvelope.schema"
import { ChoreCompletionWhereUniqueInputObjectSchema } from "./ChoreCompletionWhereUniqueInput.schema"

import type { Prisma } from "@prisma/client"

const Schema: z.ZodType<Prisma.ChoreCompletionUncheckedCreateNestedManyWithoutCompletedByUserInput> =
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
            createMany: z
                .lazy(
                    () =>
                        ChoreCompletionCreateManyCompletedByUserInputEnvelopeObjectSchema
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

export const ChoreCompletionUncheckedCreateNestedManyWithoutCompletedByUserInputObjectSchema =
    Schema
