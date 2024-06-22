import { z } from "zod"
import { UserCreateWithoutHomeInputObjectSchema } from "./UserCreateWithoutHomeInput.schema"
import { UserUncheckedCreateWithoutHomeInputObjectSchema } from "./UserUncheckedCreateWithoutHomeInput.schema"
import { UserCreateOrConnectWithoutHomeInputObjectSchema } from "./UserCreateOrConnectWithoutHomeInput.schema"
import { UserCreateManyHomeInputEnvelopeObjectSchema } from "./UserCreateManyHomeInputEnvelope.schema"
import { UserWhereUniqueInputObjectSchema } from "./UserWhereUniqueInput.schema"

import type { Prisma } from "@prisma/client"

const Schema: z.ZodType<Prisma.UserUncheckedCreateNestedManyWithoutHomeInput> =
    z
        .object({
            create: z
                .union([
                    z.lazy(() => UserCreateWithoutHomeInputObjectSchema),
                    z
                        .lazy(() => UserCreateWithoutHomeInputObjectSchema)
                        .array(),
                    z.lazy(
                        () => UserUncheckedCreateWithoutHomeInputObjectSchema
                    ),
                    z
                        .lazy(
                            () =>
                                UserUncheckedCreateWithoutHomeInputObjectSchema
                        )
                        .array(),
                ])
                .optional(),
            connectOrCreate: z
                .union([
                    z.lazy(
                        () => UserCreateOrConnectWithoutHomeInputObjectSchema
                    ),
                    z
                        .lazy(
                            () =>
                                UserCreateOrConnectWithoutHomeInputObjectSchema
                        )
                        .array(),
                ])
                .optional(),
            createMany: z
                .lazy(() => UserCreateManyHomeInputEnvelopeObjectSchema)
                .optional(),
            connect: z
                .union([
                    z.lazy(() => UserWhereUniqueInputObjectSchema),
                    z.lazy(() => UserWhereUniqueInputObjectSchema).array(),
                ])
                .optional(),
        })
        .strict()

export const UserUncheckedCreateNestedManyWithoutHomeInputObjectSchema = Schema
