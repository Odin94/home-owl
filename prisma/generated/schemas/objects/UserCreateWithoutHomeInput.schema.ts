import { z } from "zod"
import { AccountCreateNestedManyWithoutUserInputObjectSchema } from "./AccountCreateNestedManyWithoutUserInput.schema"
import { SessionCreateNestedManyWithoutUserInputObjectSchema } from "./SessionCreateNestedManyWithoutUserInput.schema"
import { ChoreCompletionCreateNestedManyWithoutCompletedByUserInputObjectSchema } from "./ChoreCompletionCreateNestedManyWithoutCompletedByUserInput.schema"

import type { Prisma } from "@prisma/client"

const Schema: z.ZodType<Prisma.UserCreateWithoutHomeInput> = z
    .object({
        id: z.string().optional(),
        name: z.string().optional().nullable(),
        email: z.string().optional().nullable(),
        emailVerified: z.coerce.date().optional().nullable(),
        imageUrl: z.string().optional().nullable(),
        clerkUserId: z.string(),
        points: z.number().optional(),
        accounts: z
            .lazy(() => AccountCreateNestedManyWithoutUserInputObjectSchema)
            .optional(),
        sessions: z
            .lazy(() => SessionCreateNestedManyWithoutUserInputObjectSchema)
            .optional(),
        choreCompletions: z
            .lazy(
                () =>
                    ChoreCompletionCreateNestedManyWithoutCompletedByUserInputObjectSchema
            )
            .optional(),
    })
    .strict()

export const UserCreateWithoutHomeInputObjectSchema = Schema
