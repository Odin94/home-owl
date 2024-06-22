import { z } from "zod"
import { UserCreateWithoutChoreCompletionsInputObjectSchema } from "./UserCreateWithoutChoreCompletionsInput.schema"
import { UserUncheckedCreateWithoutChoreCompletionsInputObjectSchema } from "./UserUncheckedCreateWithoutChoreCompletionsInput.schema"
import { UserCreateOrConnectWithoutChoreCompletionsInputObjectSchema } from "./UserCreateOrConnectWithoutChoreCompletionsInput.schema"
import { UserWhereUniqueInputObjectSchema } from "./UserWhereUniqueInput.schema"

import type { Prisma } from "@prisma/client"

const Schema: z.ZodType<Prisma.UserCreateNestedOneWithoutChoreCompletionsInput> =
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
            connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
        })
        .strict()

export const UserCreateNestedOneWithoutChoreCompletionsInputObjectSchema =
    Schema
