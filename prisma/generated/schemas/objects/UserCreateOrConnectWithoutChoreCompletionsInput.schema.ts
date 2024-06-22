import { z } from "zod"
import { UserWhereUniqueInputObjectSchema } from "./UserWhereUniqueInput.schema"
import { UserCreateWithoutChoreCompletionsInputObjectSchema } from "./UserCreateWithoutChoreCompletionsInput.schema"
import { UserUncheckedCreateWithoutChoreCompletionsInputObjectSchema } from "./UserUncheckedCreateWithoutChoreCompletionsInput.schema"

import type { Prisma } from "@prisma/client"

const Schema: z.ZodType<Prisma.UserCreateOrConnectWithoutChoreCompletionsInput> =
    z
        .object({
            where: z.lazy(() => UserWhereUniqueInputObjectSchema),
            create: z.union([
                z.lazy(
                    () => UserCreateWithoutChoreCompletionsInputObjectSchema
                ),
                z.lazy(
                    () =>
                        UserUncheckedCreateWithoutChoreCompletionsInputObjectSchema
                ),
            ]),
        })
        .strict()

export const UserCreateOrConnectWithoutChoreCompletionsInputObjectSchema =
    Schema
