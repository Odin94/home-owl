import { z } from "zod"
import { ChoreCompletionCreateNestedManyWithoutChoreInputObjectSchema } from "./ChoreCompletionCreateNestedManyWithoutChoreInput.schema"

import type { Prisma } from "@prisma/client"

const Schema: z.ZodType<Prisma.ChoreCreateWithoutHomeInput> = z
    .object({
        id: z.string().optional(),
        createdAt: z.coerce.date().optional(),
        name: z.string(),
        description: z.string(),
        points: z.number(),
        shouldRepeat: z.boolean(),
        repeatIntervalMinutes: z.number(),
        deadline: z.coerce.date(),
        choreCompletions: z
            .lazy(
                () =>
                    ChoreCompletionCreateNestedManyWithoutChoreInputObjectSchema
            )
            .optional(),
    })
    .strict()

export const ChoreCreateWithoutHomeInputObjectSchema = Schema
