import { z } from "zod"
import { ChoreUpdateWithoutChoreCompletionsInputObjectSchema } from "./ChoreUpdateWithoutChoreCompletionsInput.schema"
import { ChoreUncheckedUpdateWithoutChoreCompletionsInputObjectSchema } from "./ChoreUncheckedUpdateWithoutChoreCompletionsInput.schema"
import { ChoreCreateWithoutChoreCompletionsInputObjectSchema } from "./ChoreCreateWithoutChoreCompletionsInput.schema"
import { ChoreUncheckedCreateWithoutChoreCompletionsInputObjectSchema } from "./ChoreUncheckedCreateWithoutChoreCompletionsInput.schema"

import type { Prisma } from "@prisma/client"

const Schema: z.ZodType<Prisma.ChoreUpsertWithoutChoreCompletionsInput> = z
    .object({
        update: z.union([
            z.lazy(() => ChoreUpdateWithoutChoreCompletionsInputObjectSchema),
            z.lazy(
                () =>
                    ChoreUncheckedUpdateWithoutChoreCompletionsInputObjectSchema
            ),
        ]),
        create: z.union([
            z.lazy(() => ChoreCreateWithoutChoreCompletionsInputObjectSchema),
            z.lazy(
                () =>
                    ChoreUncheckedCreateWithoutChoreCompletionsInputObjectSchema
            ),
        ]),
    })
    .strict()

export const ChoreUpsertWithoutChoreCompletionsInputObjectSchema = Schema
