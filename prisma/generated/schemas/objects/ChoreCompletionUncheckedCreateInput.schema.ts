import { z } from "zod"

import type { Prisma } from "@prisma/client"

const Schema: z.ZodType<Prisma.ChoreCompletionUncheckedCreateInput> = z
    .object({
        id: z.string().optional(),
        createdAt: z.coerce.date().optional(),
        completedAt: z.coerce.date().optional(),
        choreId: z.string().optional().nullable(),
        choreName: z.string().optional().nullable(),
        points: z.number(),
        completedByUserId: z.string(),
    })
    .strict()

export const ChoreCompletionUncheckedCreateInputObjectSchema = Schema
