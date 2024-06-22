import { z } from "zod"
import { ChoreWhereInputObjectSchema } from "./ChoreWhereInput.schema"

import type { Prisma } from "@prisma/client"

const Schema: z.ZodType<Prisma.ChoreListRelationFilter> = z
    .object({
        every: z.lazy(() => ChoreWhereInputObjectSchema).optional(),
        some: z.lazy(() => ChoreWhereInputObjectSchema).optional(),
        none: z.lazy(() => ChoreWhereInputObjectSchema).optional(),
    })
    .strict()

export const ChoreListRelationFilterObjectSchema = Schema
