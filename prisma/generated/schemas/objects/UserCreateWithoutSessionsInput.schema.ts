import { z } from "zod"
import { AccountCreateNestedManyWithoutUserInputObjectSchema } from "./AccountCreateNestedManyWithoutUserInput.schema"
import { ChoreCompletionCreateNestedManyWithoutCompletedByUserInputObjectSchema } from "./ChoreCompletionCreateNestedManyWithoutCompletedByUserInput.schema"
import { HomeCreateNestedOneWithoutUsersInputObjectSchema } from "./HomeCreateNestedOneWithoutUsersInput.schema"

import type { Prisma } from "@prisma/client"

const Schema: z.ZodType<Prisma.UserCreateWithoutSessionsInput> = z
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
        choreCompletions: z
            .lazy(
                () =>
                    ChoreCompletionCreateNestedManyWithoutCompletedByUserInputObjectSchema
            )
            .optional(),
        home: z
            .lazy(() => HomeCreateNestedOneWithoutUsersInputObjectSchema)
            .optional(),
    })
    .strict()

export const UserCreateWithoutSessionsInputObjectSchema = Schema
