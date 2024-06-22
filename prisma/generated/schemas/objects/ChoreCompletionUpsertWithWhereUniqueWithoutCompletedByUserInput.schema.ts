import { z } from "zod"
import { ChoreCompletionWhereUniqueInputObjectSchema } from "./ChoreCompletionWhereUniqueInput.schema"
import { ChoreCompletionUpdateWithoutCompletedByUserInputObjectSchema } from "./ChoreCompletionUpdateWithoutCompletedByUserInput.schema"
import { ChoreCompletionUncheckedUpdateWithoutCompletedByUserInputObjectSchema } from "./ChoreCompletionUncheckedUpdateWithoutCompletedByUserInput.schema"
import { ChoreCompletionCreateWithoutCompletedByUserInputObjectSchema } from "./ChoreCompletionCreateWithoutCompletedByUserInput.schema"
import { ChoreCompletionUncheckedCreateWithoutCompletedByUserInputObjectSchema } from "./ChoreCompletionUncheckedCreateWithoutCompletedByUserInput.schema"

import type { Prisma } from "@prisma/client"

const Schema: z.ZodType<Prisma.ChoreCompletionUpsertWithWhereUniqueWithoutCompletedByUserInput> =
    z
        .object({
            where: z.lazy(() => ChoreCompletionWhereUniqueInputObjectSchema),
            update: z.union([
                z.lazy(
                    () =>
                        ChoreCompletionUpdateWithoutCompletedByUserInputObjectSchema
                ),
                z.lazy(
                    () =>
                        ChoreCompletionUncheckedUpdateWithoutCompletedByUserInputObjectSchema
                ),
            ]),
            create: z.union([
                z.lazy(
                    () =>
                        ChoreCompletionCreateWithoutCompletedByUserInputObjectSchema
                ),
                z.lazy(
                    () =>
                        ChoreCompletionUncheckedCreateWithoutCompletedByUserInputObjectSchema
                ),
            ]),
        })
        .strict()

export const ChoreCompletionUpsertWithWhereUniqueWithoutCompletedByUserInputObjectSchema =
    Schema
