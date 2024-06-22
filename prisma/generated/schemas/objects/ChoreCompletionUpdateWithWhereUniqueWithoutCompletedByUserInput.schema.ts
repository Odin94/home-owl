import { z } from "zod"
import { ChoreCompletionWhereUniqueInputObjectSchema } from "./ChoreCompletionWhereUniqueInput.schema"
import { ChoreCompletionUpdateWithoutCompletedByUserInputObjectSchema } from "./ChoreCompletionUpdateWithoutCompletedByUserInput.schema"
import { ChoreCompletionUncheckedUpdateWithoutCompletedByUserInputObjectSchema } from "./ChoreCompletionUncheckedUpdateWithoutCompletedByUserInput.schema"

import type { Prisma } from "@prisma/client"

const Schema: z.ZodType<Prisma.ChoreCompletionUpdateWithWhereUniqueWithoutCompletedByUserInput> =
    z
        .object({
            where: z.lazy(() => ChoreCompletionWhereUniqueInputObjectSchema),
            data: z.union([
                z.lazy(
                    () =>
                        ChoreCompletionUpdateWithoutCompletedByUserInputObjectSchema
                ),
                z.lazy(
                    () =>
                        ChoreCompletionUncheckedUpdateWithoutCompletedByUserInputObjectSchema
                ),
            ]),
        })
        .strict()

export const ChoreCompletionUpdateWithWhereUniqueWithoutCompletedByUserInputObjectSchema =
    Schema
