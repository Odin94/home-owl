import { z } from "zod"
import { ChoreCompletionWhereUniqueInputObjectSchema } from "./ChoreCompletionWhereUniqueInput.schema"
import { ChoreCompletionUpdateWithoutChoreInputObjectSchema } from "./ChoreCompletionUpdateWithoutChoreInput.schema"
import { ChoreCompletionUncheckedUpdateWithoutChoreInputObjectSchema } from "./ChoreCompletionUncheckedUpdateWithoutChoreInput.schema"

import type { Prisma } from "@prisma/client"

const Schema: z.ZodType<Prisma.ChoreCompletionUpdateWithWhereUniqueWithoutChoreInput> =
    z
        .object({
            where: z.lazy(() => ChoreCompletionWhereUniqueInputObjectSchema),
            data: z.union([
                z.lazy(
                    () => ChoreCompletionUpdateWithoutChoreInputObjectSchema
                ),
                z.lazy(
                    () =>
                        ChoreCompletionUncheckedUpdateWithoutChoreInputObjectSchema
                ),
            ]),
        })
        .strict()

export const ChoreCompletionUpdateWithWhereUniqueWithoutChoreInputObjectSchema =
    Schema
