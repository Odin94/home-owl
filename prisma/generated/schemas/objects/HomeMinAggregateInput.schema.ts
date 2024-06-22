import { z } from "zod"

import type { Prisma } from "@prisma/client"

const Schema: z.ZodType<Prisma.HomeMinAggregateInputType> = z
    .object({
        id: z.literal(true).optional(),
        createdAt: z.literal(true).optional(),
    })
    .strict()

export const HomeMinAggregateInputObjectSchema = Schema
