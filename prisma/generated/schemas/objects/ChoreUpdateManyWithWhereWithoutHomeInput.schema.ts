import { z } from "zod"
import { ChoreScalarWhereInputObjectSchema } from "./ChoreScalarWhereInput.schema"
import { ChoreUpdateManyMutationInputObjectSchema } from "./ChoreUpdateManyMutationInput.schema"
import { ChoreUncheckedUpdateManyWithoutChoresInputObjectSchema } from "./ChoreUncheckedUpdateManyWithoutChoresInput.schema"

import type { Prisma } from "@prisma/client"

const Schema: z.ZodType<Prisma.ChoreUpdateManyWithWhereWithoutHomeInput> = z
    .object({
        where: z.lazy(() => ChoreScalarWhereInputObjectSchema),
        data: z.union([
            z.lazy(() => ChoreUpdateManyMutationInputObjectSchema),
            z.lazy(
                () => ChoreUncheckedUpdateManyWithoutChoresInputObjectSchema
            ),
        ]),
    })
    .strict()

export const ChoreUpdateManyWithWhereWithoutHomeInputObjectSchema = Schema
