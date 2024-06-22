import { z } from "zod"
import { ChoreCompletionScalarWhereInputObjectSchema } from "./ChoreCompletionScalarWhereInput.schema"
import { ChoreCompletionUpdateManyMutationInputObjectSchema } from "./ChoreCompletionUpdateManyMutationInput.schema"
import { ChoreCompletionUncheckedUpdateManyWithoutChoreCompletionsInputObjectSchema } from "./ChoreCompletionUncheckedUpdateManyWithoutChoreCompletionsInput.schema"

import type { Prisma } from "@prisma/client"

const Schema: z.ZodType<Prisma.ChoreCompletionUpdateManyWithWhereWithoutCompletedByUserInput> =
    z
        .object({
            where: z.lazy(() => ChoreCompletionScalarWhereInputObjectSchema),
            data: z.union([
                z.lazy(
                    () => ChoreCompletionUpdateManyMutationInputObjectSchema
                ),
                z.lazy(
                    () =>
                        ChoreCompletionUncheckedUpdateManyWithoutChoreCompletionsInputObjectSchema
                ),
            ]),
        })
        .strict()

export const ChoreCompletionUpdateManyWithWhereWithoutCompletedByUserInputObjectSchema =
    Schema
