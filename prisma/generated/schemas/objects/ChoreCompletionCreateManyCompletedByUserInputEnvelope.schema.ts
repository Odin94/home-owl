import { z } from "zod"
import { ChoreCompletionCreateManyCompletedByUserInputObjectSchema } from "./ChoreCompletionCreateManyCompletedByUserInput.schema"

import type { Prisma } from "@prisma/client"

const Schema: z.ZodType<Prisma.ChoreCompletionCreateManyCompletedByUserInputEnvelope> =
    z
        .object({
            data: z.union([
                z.lazy(
                    () =>
                        ChoreCompletionCreateManyCompletedByUserInputObjectSchema
                ),
                z
                    .lazy(
                        () =>
                            ChoreCompletionCreateManyCompletedByUserInputObjectSchema
                    )
                    .array(),
            ]),
            skipDuplicates: z.boolean().optional(),
        })
        .strict()

export const ChoreCompletionCreateManyCompletedByUserInputEnvelopeObjectSchema =
    Schema
