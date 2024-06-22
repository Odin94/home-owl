import { z } from "zod"
import { UserUpdateWithoutChoreCompletionsInputObjectSchema } from "./UserUpdateWithoutChoreCompletionsInput.schema"
import { UserUncheckedUpdateWithoutChoreCompletionsInputObjectSchema } from "./UserUncheckedUpdateWithoutChoreCompletionsInput.schema"
import { UserCreateWithoutChoreCompletionsInputObjectSchema } from "./UserCreateWithoutChoreCompletionsInput.schema"
import { UserUncheckedCreateWithoutChoreCompletionsInputObjectSchema } from "./UserUncheckedCreateWithoutChoreCompletionsInput.schema"

import type { Prisma } from "@prisma/client"

const Schema: z.ZodType<Prisma.UserUpsertWithoutChoreCompletionsInput> = z
    .object({
        update: z.union([
            z.lazy(() => UserUpdateWithoutChoreCompletionsInputObjectSchema),
            z.lazy(
                () =>
                    UserUncheckedUpdateWithoutChoreCompletionsInputObjectSchema
            ),
        ]),
        create: z.union([
            z.lazy(() => UserCreateWithoutChoreCompletionsInputObjectSchema),
            z.lazy(
                () =>
                    UserUncheckedCreateWithoutChoreCompletionsInputObjectSchema
            ),
        ]),
    })
    .strict()

export const UserUpsertWithoutChoreCompletionsInputObjectSchema = Schema
