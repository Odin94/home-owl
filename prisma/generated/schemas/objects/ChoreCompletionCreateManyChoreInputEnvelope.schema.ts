import { z } from "zod"
import { ChoreCompletionCreateManyChoreInputObjectSchema } from "./ChoreCompletionCreateManyChoreInput.schema"

import type { Prisma } from "@prisma/client"

const Schema: z.ZodType<Prisma.ChoreCompletionCreateManyChoreInputEnvelope> = z
    .object({
        data: z.union([
            z.lazy(() => ChoreCompletionCreateManyChoreInputObjectSchema),
            z
                .lazy(() => ChoreCompletionCreateManyChoreInputObjectSchema)
                .array(),
        ]),
        skipDuplicates: z.boolean().optional(),
    })
    .strict()

export const ChoreCompletionCreateManyChoreInputEnvelopeObjectSchema = Schema
