import { z } from "zod"
import { ChoreCreateWithoutChoreCompletionsInputObjectSchema } from "./ChoreCreateWithoutChoreCompletionsInput.schema"
import { ChoreUncheckedCreateWithoutChoreCompletionsInputObjectSchema } from "./ChoreUncheckedCreateWithoutChoreCompletionsInput.schema"
import { ChoreCreateOrConnectWithoutChoreCompletionsInputObjectSchema } from "./ChoreCreateOrConnectWithoutChoreCompletionsInput.schema"
import { ChoreUpsertWithoutChoreCompletionsInputObjectSchema } from "./ChoreUpsertWithoutChoreCompletionsInput.schema"
import { ChoreWhereUniqueInputObjectSchema } from "./ChoreWhereUniqueInput.schema"
import { ChoreUpdateWithoutChoreCompletionsInputObjectSchema } from "./ChoreUpdateWithoutChoreCompletionsInput.schema"
import { ChoreUncheckedUpdateWithoutChoreCompletionsInputObjectSchema } from "./ChoreUncheckedUpdateWithoutChoreCompletionsInput.schema"

import type { Prisma } from "@prisma/client"

const Schema: z.ZodType<Prisma.ChoreUpdateOneWithoutChoreCompletionsNestedInput> =
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
            upsert: z
                .lazy(() => ChoreUpsertWithoutChoreCompletionsInputObjectSchema)
                .optional(),
            disconnect: z.boolean().optional(),
            delete: z.boolean().optional(),
            connect: z.lazy(() => ChoreWhereUniqueInputObjectSchema).optional(),
            update: z
                .union([
                    z.lazy(
                        () =>
                            ChoreUpdateWithoutChoreCompletionsInputObjectSchema
                    ),
                    z.lazy(
                        () =>
                            ChoreUncheckedUpdateWithoutChoreCompletionsInputObjectSchema
                    ),
                ])
                .optional(),
        })
        .strict()

export const ChoreUpdateOneWithoutChoreCompletionsNestedInputObjectSchema =
    Schema
