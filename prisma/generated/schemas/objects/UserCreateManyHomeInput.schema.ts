import { z } from "zod"

import type { Prisma } from "@prisma/client"

const Schema: z.ZodType<Prisma.UserCreateManyHomeInput> = z
    .object({
        id: z.string().optional(),
        name: z.string().optional().nullable(),
        email: z.string().optional().nullable(),
        emailVerified: z.coerce.date().optional().nullable(),
        imageUrl: z.string().optional().nullable(),
        clerkUserId: z.string(),
        points: z.number().optional(),
    })
    .strict()

export const UserCreateManyHomeInputObjectSchema = Schema
