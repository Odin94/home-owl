import { z } from "zod"
import { ChoreCompletionWhereUniqueInputObjectSchema } from "./ChoreCompletionWhereUniqueInput.schema"
import { ChoreCompletionCreateWithoutChoreInputObjectSchema } from "./ChoreCompletionCreateWithoutChoreInput.schema"
import { ChoreCompletionUncheckedCreateWithoutChoreInputObjectSchema } from "./ChoreCompletionUncheckedCreateWithoutChoreInput.schema"

import type { Prisma } from "@prisma/client"

const Schema: z.ZodType<Prisma.ChoreCompletionCreateOrConnectWithoutChoreInput> =
    z
        .object({
            where: z.lazy(() => ChoreCompletionWhereUniqueInputObjectSchema),
            create: z.union([
                z.lazy(
                    () => ChoreCompletionCreateWithoutChoreInputObjectSchema
                ),
                z.lazy(
                    () =>
                        ChoreCompletionUncheckedCreateWithoutChoreInputObjectSchema
                ),
            ]),
        })
        .strict()

export const ChoreCompletionCreateOrConnectWithoutChoreInputObjectSchema =
    Schema
