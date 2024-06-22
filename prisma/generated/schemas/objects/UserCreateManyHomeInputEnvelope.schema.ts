import { z } from "zod"
import { UserCreateManyHomeInputObjectSchema } from "./UserCreateManyHomeInput.schema"

import type { Prisma } from "@prisma/client"

const Schema: z.ZodType<Prisma.UserCreateManyHomeInputEnvelope> = z
    .object({
        data: z.union([
            z.lazy(() => UserCreateManyHomeInputObjectSchema),
            z.lazy(() => UserCreateManyHomeInputObjectSchema).array(),
        ]),
        skipDuplicates: z.boolean().optional(),
    })
    .strict()

export const UserCreateManyHomeInputEnvelopeObjectSchema = Schema
