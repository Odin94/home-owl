import { z } from "zod"
import { ChoreCreateManyHomeInputObjectSchema } from "./ChoreCreateManyHomeInput.schema"

import type { Prisma } from "@prisma/client"

const Schema: z.ZodType<Prisma.ChoreCreateManyHomeInputEnvelope> = z
    .object({
        data: z.union([
            z.lazy(() => ChoreCreateManyHomeInputObjectSchema),
            z.lazy(() => ChoreCreateManyHomeInputObjectSchema).array(),
        ]),
        skipDuplicates: z.boolean().optional(),
    })
    .strict()

export const ChoreCreateManyHomeInputEnvelopeObjectSchema = Schema
