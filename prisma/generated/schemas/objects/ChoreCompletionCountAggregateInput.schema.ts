import { z } from "zod"

import type { Prisma } from "@prisma/client"

const Schema: z.ZodType<Prisma.ChoreCompletionCountAggregateInputType> = z
    .object({
        id: z.literal(true).optional(),
        createdAt: z.literal(true).optional(),
        completedAt: z.literal(true).optional(),
        choreId: z.literal(true).optional(),
        choreName: z.literal(true).optional(),
        points: z.literal(true).optional(),
        completedByUserId: z.literal(true).optional(),
        _all: z.literal(true).optional(),
    })
    .strict()

export const ChoreCompletionCountAggregateInputObjectSchema = Schema
