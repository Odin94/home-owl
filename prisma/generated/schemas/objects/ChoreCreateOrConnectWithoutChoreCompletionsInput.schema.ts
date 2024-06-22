import { z } from "zod"
import { ChoreWhereUniqueInputObjectSchema } from "./ChoreWhereUniqueInput.schema"
import { ChoreCreateWithoutChoreCompletionsInputObjectSchema } from "./ChoreCreateWithoutChoreCompletionsInput.schema"
import { ChoreUncheckedCreateWithoutChoreCompletionsInputObjectSchema } from "./ChoreUncheckedCreateWithoutChoreCompletionsInput.schema"

import type { Prisma } from "@prisma/client"

const Schema: z.ZodType<Prisma.ChoreCreateOrConnectWithoutChoreCompletionsInput> =
    z
        .object({
            where: z.lazy(() => ChoreWhereUniqueInputObjectSchema),
            create: z.union([
                z.lazy(
                    () => ChoreCreateWithoutChoreCompletionsInputObjectSchema
                ),
                z.lazy(
                    () =>
                        ChoreUncheckedCreateWithoutChoreCompletionsInputObjectSchema
                ),
            ]),
        })
        .strict()

export const ChoreCreateOrConnectWithoutChoreCompletionsInputObjectSchema =
    Schema
