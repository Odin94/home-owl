import { z } from "zod"
import { ChoreCompletionWhereUniqueInputObjectSchema } from "./ChoreCompletionWhereUniqueInput.schema"
import { ChoreCompletionCreateWithoutCompletedByUserInputObjectSchema } from "./ChoreCompletionCreateWithoutCompletedByUserInput.schema"
import { ChoreCompletionUncheckedCreateWithoutCompletedByUserInputObjectSchema } from "./ChoreCompletionUncheckedCreateWithoutCompletedByUserInput.schema"

import type { Prisma } from "@prisma/client"

const Schema: z.ZodType<Prisma.ChoreCompletionCreateOrConnectWithoutCompletedByUserInput> =
    z
        .object({
            where: z.lazy(() => ChoreCompletionWhereUniqueInputObjectSchema),
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

export const ChoreCompletionCreateOrConnectWithoutCompletedByUserInputObjectSchema =
    Schema
