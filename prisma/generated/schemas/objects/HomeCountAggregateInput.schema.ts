import { z } from "zod"

import type { Prisma } from "@prisma/client"

const Schema: z.ZodType<Prisma.HomeCountAggregateInputType> = z
    .object({
        id: z.literal(true).optional(),
        createdAt: z.literal(true).optional(),
        _all: z.literal(true).optional(),
    })
    .strict()

export const HomeCountAggregateInputObjectSchema = Schema
