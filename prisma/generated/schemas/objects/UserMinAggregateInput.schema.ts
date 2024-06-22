import { z } from "zod"

import type { Prisma } from "@prisma/client"

const Schema: z.ZodType<Prisma.UserMinAggregateInputType> = z
    .object({
        id: z.literal(true).optional(),
        name: z.literal(true).optional(),
        email: z.literal(true).optional(),
        emailVerified: z.literal(true).optional(),
        imageUrl: z.literal(true).optional(),
        clerkUserId: z.literal(true).optional(),
        points: z.literal(true).optional(),
        homeId: z.literal(true).optional(),
    })
    .strict()

export const UserMinAggregateInputObjectSchema = Schema
