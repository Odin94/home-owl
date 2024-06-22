import { z } from "zod"

import type { Prisma } from "@prisma/client"

const Schema: z.ZodType<Prisma.UserCreateManyInput> = z
    .object({
        id: z.string().optional(),
        name: z.string().optional().nullable(),
        email: z.string().optional().nullable(),
        emailVerified: z.coerce.date().optional().nullable(),
        imageUrl: z.string().optional().nullable(),
        clerkUserId: z.string(),
        points: z.number().optional(),
        homeId: z.string().optional().nullable(),
    })
    .strict()

export const UserCreateManyInputObjectSchema = Schema
