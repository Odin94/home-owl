import { z } from "zod"
import { HomeCreateNestedOneWithoutChoresInputObjectSchema } from "./HomeCreateNestedOneWithoutChoresInput.schema"
import { ChoreCompletionCreateNestedManyWithoutChoreInputObjectSchema } from "./ChoreCompletionCreateNestedManyWithoutChoreInput.schema"

import type { Prisma } from "@prisma/client"

const Schema: z.ZodType<Prisma.ChoreCreateInput> = z
    .object({
        id: z.string().optional(),
        createdAt: z.coerce.date().optional(),
        name: z.string(),
        description: z.string(),
        points: z.number(),
        shouldRepeat: z.boolean(),
        repeatIntervalMinutes: z.number(),
        deadline: z.coerce.date(),
        home: z.lazy(() => HomeCreateNestedOneWithoutChoresInputObjectSchema),
        choreCompletions: z
            .lazy(
                () =>
                    ChoreCompletionCreateNestedManyWithoutChoreInputObjectSchema
            )
            .optional(),
    })
    .strict()

export const ChoreCreateInputObjectSchema = Schema
