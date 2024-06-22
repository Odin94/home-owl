import { z } from "zod"

import type { Prisma } from "@prisma/client"

const Schema: z.ZodType<Prisma.ChoreCreateManyHomeInput> = z
    .object({
        id: z.string().optional(),
        createdAt: z.coerce.date().optional(),
        name: z.string(),
        description: z.string(),
        points: z.number(),
        shouldRepeat: z.boolean(),
        repeatIntervalMinutes: z.number(),
        deadline: z.coerce.date(),
    })
    .strict()

export const ChoreCreateManyHomeInputObjectSchema = Schema
