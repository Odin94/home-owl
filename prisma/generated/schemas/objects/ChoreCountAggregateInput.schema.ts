import { z } from "zod"

import type { Prisma } from "@prisma/client"

const Schema: z.ZodType<Prisma.ChoreCountAggregateInputType> = z
    .object({
        id: z.literal(true).optional(),
        createdAt: z.literal(true).optional(),
        name: z.literal(true).optional(),
        description: z.literal(true).optional(),
        points: z.literal(true).optional(),
        shouldRepeat: z.literal(true).optional(),
        repeatIntervalMinutes: z.literal(true).optional(),
        deadline: z.literal(true).optional(),
        homeId: z.literal(true).optional(),
        _all: z.literal(true).optional(),
    })
    .strict()

export const ChoreCountAggregateInputObjectSchema = Schema
