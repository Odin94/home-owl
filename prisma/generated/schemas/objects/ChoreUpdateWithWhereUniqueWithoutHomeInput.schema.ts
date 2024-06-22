import { z } from "zod"
import { ChoreWhereUniqueInputObjectSchema } from "./ChoreWhereUniqueInput.schema"
import { ChoreUpdateWithoutHomeInputObjectSchema } from "./ChoreUpdateWithoutHomeInput.schema"
import { ChoreUncheckedUpdateWithoutHomeInputObjectSchema } from "./ChoreUncheckedUpdateWithoutHomeInput.schema"

import type { Prisma } from "@prisma/client"

const Schema: z.ZodType<Prisma.ChoreUpdateWithWhereUniqueWithoutHomeInput> = z
    .object({
        where: z.lazy(() => ChoreWhereUniqueInputObjectSchema),
        data: z.union([
            z.lazy(() => ChoreUpdateWithoutHomeInputObjectSchema),
            z.lazy(() => ChoreUncheckedUpdateWithoutHomeInputObjectSchema),
        ]),
    })
    .strict()

export const ChoreUpdateWithWhereUniqueWithoutHomeInputObjectSchema = Schema
