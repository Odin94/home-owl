import { z } from "zod"
import { UserCreateWithoutChoreCompletionsInputObjectSchema } from "./UserCreateWithoutChoreCompletionsInput.schema"
import { UserUncheckedCreateWithoutChoreCompletionsInputObjectSchema } from "./UserUncheckedCreateWithoutChoreCompletionsInput.schema"
import { UserCreateOrConnectWithoutChoreCompletionsInputObjectSchema } from "./UserCreateOrConnectWithoutChoreCompletionsInput.schema"
import { UserUpsertWithoutChoreCompletionsInputObjectSchema } from "./UserUpsertWithoutChoreCompletionsInput.schema"
import { UserWhereUniqueInputObjectSchema } from "./UserWhereUniqueInput.schema"
import { UserUpdateWithoutChoreCompletionsInputObjectSchema } from "./UserUpdateWithoutChoreCompletionsInput.schema"
import { UserUncheckedUpdateWithoutChoreCompletionsInputObjectSchema } from "./UserUncheckedUpdateWithoutChoreCompletionsInput.schema"

import type { Prisma } from "@prisma/client"

const Schema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutChoreCompletionsNestedInput> =
    z
        .object({
            create: z
                .union([
                    z.lazy(
                        () => UserCreateWithoutChoreCompletionsInputObjectSchema
                    ),
                    z.lazy(
                        () =>
                            UserUncheckedCreateWithoutChoreCompletionsInputObjectSchema
                    ),
                ])
                .optional(),
            connectOrCreate: z
                .lazy(
                    () =>
                        UserCreateOrConnectWithoutChoreCompletionsInputObjectSchema
                )
                .optional(),
            upsert: z
                .lazy(() => UserUpsertWithoutChoreCompletionsInputObjectSchema)
                .optional(),
            connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
            update: z
                .union([
                    z.lazy(
                        () => UserUpdateWithoutChoreCompletionsInputObjectSchema
                    ),
                    z.lazy(
                        () =>
                            UserUncheckedUpdateWithoutChoreCompletionsInputObjectSchema
                    ),
                ])
                .optional(),
        })
        .strict()

export const UserUpdateOneRequiredWithoutChoreCompletionsNestedInputObjectSchema =
    Schema
