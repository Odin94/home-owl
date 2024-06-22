import { z } from "zod"
import { ChoreWhereUniqueInputObjectSchema } from "./ChoreWhereUniqueInput.schema"
import { ChoreUpdateWithoutHomeInputObjectSchema } from "./ChoreUpdateWithoutHomeInput.schema"
import { ChoreUncheckedUpdateWithoutHomeInputObjectSchema } from "./ChoreUncheckedUpdateWithoutHomeInput.schema"
import { ChoreCreateWithoutHomeInputObjectSchema } from "./ChoreCreateWithoutHomeInput.schema"
import { ChoreUncheckedCreateWithoutHomeInputObjectSchema } from "./ChoreUncheckedCreateWithoutHomeInput.schema"

import type { Prisma } from "@prisma/client"

const Schema: z.ZodType<Prisma.ChoreUpsertWithWhereUniqueWithoutHomeInput> = z
    .object({
        where: z.lazy(() => ChoreWhereUniqueInputObjectSchema),
        update: z.union([
            z.lazy(() => ChoreUpdateWithoutHomeInputObjectSchema),
            z.lazy(() => ChoreUncheckedUpdateWithoutHomeInputObjectSchema),
        ]),
        create: z.union([
            z.lazy(() => ChoreCreateWithoutHomeInputObjectSchema),
            z.lazy(() => ChoreUncheckedCreateWithoutHomeInputObjectSchema),
        ]),
    })
    .strict()

export const ChoreUpsertWithWhereUniqueWithoutHomeInputObjectSchema = Schema
