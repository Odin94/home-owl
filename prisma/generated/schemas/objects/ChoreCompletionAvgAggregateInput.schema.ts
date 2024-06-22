import { z } from "zod"

import type { Prisma } from "@prisma/client"

const Schema: z.ZodType<Prisma.ChoreCompletionAvgAggregateInputType> = z
    .object({
        points: z.literal(true).optional(),
    })
    .strict()

export const ChoreCompletionAvgAggregateInputObjectSchema = Schema
