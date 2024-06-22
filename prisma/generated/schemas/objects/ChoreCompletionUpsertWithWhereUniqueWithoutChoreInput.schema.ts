import { z } from "zod"
import { ChoreCompletionWhereUniqueInputObjectSchema } from "./ChoreCompletionWhereUniqueInput.schema"
import { ChoreCompletionUpdateWithoutChoreInputObjectSchema } from "./ChoreCompletionUpdateWithoutChoreInput.schema"
import { ChoreCompletionUncheckedUpdateWithoutChoreInputObjectSchema } from "./ChoreCompletionUncheckedUpdateWithoutChoreInput.schema"
import { ChoreCompletionCreateWithoutChoreInputObjectSchema } from "./ChoreCompletionCreateWithoutChoreInput.schema"
import { ChoreCompletionUncheckedCreateWithoutChoreInputObjectSchema } from "./ChoreCompletionUncheckedCreateWithoutChoreInput.schema"

import type { Prisma } from "@prisma/client"

const Schema: z.ZodType<Prisma.ChoreCompletionUpsertWithWhereUniqueWithoutChoreInput> =
    z
        .object({
            where: z.lazy(() => ChoreCompletionWhereUniqueInputObjectSchema),
            update: z.union([
                z.lazy(
                    () => ChoreCompletionUpdateWithoutChoreInputObjectSchema
                ),
                z.lazy(
                    () =>
                        ChoreCompletionUncheckedUpdateWithoutChoreInputObjectSchema
                ),
            ]),
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

export const ChoreCompletionUpsertWithWhereUniqueWithoutChoreInputObjectSchema =
    Schema
