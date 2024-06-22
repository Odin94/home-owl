import { z } from "zod"
import { ChoreCreateNestedOneWithoutChoreCompletionsInputObjectSchema } from "./ChoreCreateNestedOneWithoutChoreCompletionsInput.schema"

import type { Prisma } from "@prisma/client"

const Schema: z.ZodType<Prisma.ChoreCompletionCreateWithoutCompletedByUserInput> =
    z
        .object({
            id: z.string().optional(),
            createdAt: z.coerce.date().optional(),
            completedAt: z.coerce.date().optional(),
            choreName: z.string().optional().nullable(),
            points: z.number(),
            chore: z
                .lazy(
                    () =>
                        ChoreCreateNestedOneWithoutChoreCompletionsInputObjectSchema
                )
                .optional(),
        })
        .strict()

export const ChoreCompletionCreateWithoutCompletedByUserInputObjectSchema =
    Schema
