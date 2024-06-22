import { z } from "zod"
import { ChoreCreateWithoutChoreCompletionsInputObjectSchema } from "./ChoreCreateWithoutChoreCompletionsInput.schema"
import { ChoreUncheckedCreateWithoutChoreCompletionsInputObjectSchema } from "./ChoreUncheckedCreateWithoutChoreCompletionsInput.schema"
import { ChoreCreateOrConnectWithoutChoreCompletionsInputObjectSchema } from "./ChoreCreateOrConnectWithoutChoreCompletionsInput.schema"
import { ChoreWhereUniqueInputObjectSchema } from "./ChoreWhereUniqueInput.schema"

import type { Prisma } from "@prisma/client"

const Schema: z.ZodType<Prisma.ChoreCreateNestedOneWithoutChoreCompletionsInput> =
    z
        .object({
            create: z
                .union([
                    z.lazy(
                        () =>
                            ChoreCreateWithoutChoreCompletionsInputObjectSchema
                    ),
                    z.lazy(
                        () =>
                            ChoreUncheckedCreateWithoutChoreCompletionsInputObjectSchema
                    ),
                ])
                .optional(),
            connectOrCreate: z
                .lazy(
                    () =>
                        ChoreCreateOrConnectWithoutChoreCompletionsInputObjectSchema
                )
                .optional(),
            connect: z.lazy(() => ChoreWhereUniqueInputObjectSchema).optional(),
        })
        .strict()

export const ChoreCreateNestedOneWithoutChoreCompletionsInputObjectSchema =
    Schema
