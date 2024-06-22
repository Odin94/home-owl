import { z } from "zod"
import { UserCreateNestedOneWithoutChoreCompletionsInputObjectSchema } from "./UserCreateNestedOneWithoutChoreCompletionsInput.schema"

import type { Prisma } from "@prisma/client"

const Schema: z.ZodType<Prisma.ChoreCompletionCreateWithoutChoreInput> = z
    .object({
        id: z.string().optional(),
        createdAt: z.coerce.date().optional(),
        completedAt: z.coerce.date().optional(),
        choreName: z.string().optional().nullable(),
        points: z.number(),
        completedByUser: z.lazy(
            () => UserCreateNestedOneWithoutChoreCompletionsInputObjectSchema
        ),
    })
    .strict()

export const ChoreCompletionCreateWithoutChoreInputObjectSchema = Schema
