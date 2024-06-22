import { z } from "zod"
import { HomeWhereInputObjectSchema } from "./HomeWhereInput.schema"

import type { Prisma } from "@prisma/client"

const Schema: z.ZodType<Prisma.HomeRelationFilter> = z
    .object({
        is: z
            .lazy(() => HomeWhereInputObjectSchema)
            .optional()
            .nullable(),
        isNot: z
            .lazy(() => HomeWhereInputObjectSchema)
            .optional()
            .nullable(),
    })
    .strict()

export const HomeRelationFilterObjectSchema = Schema
