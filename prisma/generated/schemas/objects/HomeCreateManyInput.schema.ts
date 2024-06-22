import { z } from "zod"

import type { Prisma } from "@prisma/client"

const Schema: z.ZodType<Prisma.HomeCreateManyInput> = z
    .object({
        id: z.string().optional(),
        createdAt: z.coerce.date().optional(),
    })
    .strict()

export const HomeCreateManyInputObjectSchema = Schema
