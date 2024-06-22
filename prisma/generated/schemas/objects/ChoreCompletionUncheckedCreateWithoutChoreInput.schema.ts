import { z } from "zod"

import type { Prisma } from "@prisma/client"

const Schema: z.ZodType<Prisma.ChoreCompletionUncheckedCreateWithoutChoreInput> =
    z
        .object({
            id: z.string().optional(),
            createdAt: z.coerce.date().optional(),
            completedAt: z.coerce.date().optional(),
            choreName: z.string().optional().nullable(),
            points: z.number(),
            completedByUserId: z.string(),
        })
        .strict()

export const ChoreCompletionUncheckedCreateWithoutChoreInputObjectSchema =
    Schema
