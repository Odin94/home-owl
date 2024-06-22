import { z } from "zod"
import { ChoreCompletionUncheckedCreateNestedManyWithoutChoreInputObjectSchema } from "./ChoreCompletionUncheckedCreateNestedManyWithoutChoreInput.schema"

import type { Prisma } from "@prisma/client"

const Schema: z.ZodType<Prisma.ChoreUncheckedCreateInput> = z
    .object({
        id: z.string().optional(),
        createdAt: z.coerce.date().optional(),
        name: z.string(),
        description: z.string(),
        points: z.number(),
        shouldRepeat: z.boolean(),
        repeatIntervalMinutes: z.number(),
        deadline: z.coerce.date(),
        homeId: z.string(),
        choreCompletions: z
            .lazy(
                () =>
                    ChoreCompletionUncheckedCreateNestedManyWithoutChoreInputObjectSchema
            )
            .optional(),
    })
    .strict()

export const ChoreUncheckedCreateInputObjectSchema = Schema
