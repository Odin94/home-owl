import { z } from "zod"
import { ChoreWhereUniqueInputObjectSchema } from "./ChoreWhereUniqueInput.schema"
import { ChoreCreateWithoutHomeInputObjectSchema } from "./ChoreCreateWithoutHomeInput.schema"
import { ChoreUncheckedCreateWithoutHomeInputObjectSchema } from "./ChoreUncheckedCreateWithoutHomeInput.schema"

import type { Prisma } from "@prisma/client"

const Schema: z.ZodType<Prisma.ChoreCreateOrConnectWithoutHomeInput> = z
    .object({
        where: z.lazy(() => ChoreWhereUniqueInputObjectSchema),
        create: z.union([
            z.lazy(() => ChoreCreateWithoutHomeInputObjectSchema),
            z.lazy(() => ChoreUncheckedCreateWithoutHomeInputObjectSchema),
        ]),
    })
    .strict()

export const ChoreCreateOrConnectWithoutHomeInputObjectSchema = Schema
