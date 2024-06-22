import { z } from "zod"
import { ChoreWhereInputObjectSchema } from "./ChoreWhereInput.schema"

import type { Prisma } from "@prisma/client"

const Schema: z.ZodType<Prisma.ChoreRelationFilter> = z
    .object({
        is: z
            .lazy(() => ChoreWhereInputObjectSchema)
            .optional()
            .nullable(),
        isNot: z
            .lazy(() => ChoreWhereInputObjectSchema)
            .optional()
            .nullable(),
    })
    .strict()

export const ChoreRelationFilterObjectSchema = Schema
