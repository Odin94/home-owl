import { z } from "zod"

import type { Prisma } from "@prisma/client"

const Schema: z.ZodType<Prisma.ChoreAvgAggregateInputType> = z
    .object({
        points: z.literal(true).optional(),
        repeatIntervalMinutes: z.literal(true).optional(),
    })
    .strict()

export const ChoreAvgAggregateInputObjectSchema = Schema
