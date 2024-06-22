import { z } from "zod"
import { AccountUncheckedCreateNestedManyWithoutUserInputObjectSchema } from "./AccountUncheckedCreateNestedManyWithoutUserInput.schema"
import { SessionUncheckedCreateNestedManyWithoutUserInputObjectSchema } from "./SessionUncheckedCreateNestedManyWithoutUserInput.schema"

import type { Prisma } from "@prisma/client"

const Schema: z.ZodType<Prisma.UserUncheckedCreateWithoutChoreCompletionsInput> =
    z
        .object({
            id: z.string().optional(),
            name: z.string().optional().nullable(),
            email: z.string().optional().nullable(),
            emailVerified: z.coerce.date().optional().nullable(),
            imageUrl: z.string().optional().nullable(),
            clerkUserId: z.string(),
            points: z.number().optional(),
            homeId: z.string().optional().nullable(),
            accounts: z
                .lazy(
                    () =>
                        AccountUncheckedCreateNestedManyWithoutUserInputObjectSchema
                )
                .optional(),
            sessions: z
                .lazy(
                    () =>
                        SessionUncheckedCreateNestedManyWithoutUserInputObjectSchema
                )
                .optional(),
        })
        .strict()

export const UserUncheckedCreateWithoutChoreCompletionsInputObjectSchema =
    Schema
