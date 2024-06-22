import { z } from "zod"
import { UserCreateWithoutHomeInputObjectSchema } from "./UserCreateWithoutHomeInput.schema"
import { UserUncheckedCreateWithoutHomeInputObjectSchema } from "./UserUncheckedCreateWithoutHomeInput.schema"
import { UserCreateOrConnectWithoutHomeInputObjectSchema } from "./UserCreateOrConnectWithoutHomeInput.schema"
import { UserUpsertWithWhereUniqueWithoutHomeInputObjectSchema } from "./UserUpsertWithWhereUniqueWithoutHomeInput.schema"
import { UserCreateManyHomeInputEnvelopeObjectSchema } from "./UserCreateManyHomeInputEnvelope.schema"
import { UserWhereUniqueInputObjectSchema } from "./UserWhereUniqueInput.schema"
import { UserUpdateWithWhereUniqueWithoutHomeInputObjectSchema } from "./UserUpdateWithWhereUniqueWithoutHomeInput.schema"
import { UserUpdateManyWithWhereWithoutHomeInputObjectSchema } from "./UserUpdateManyWithWhereWithoutHomeInput.schema"
import { UserScalarWhereInputObjectSchema } from "./UserScalarWhereInput.schema"

import type { Prisma } from "@prisma/client"

const Schema: z.ZodType<Prisma.UserUncheckedUpdateManyWithoutHomeNestedInput> =
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
            upsert: z
                .union([
                    z.lazy(
                        () =>
                            UserUpsertWithWhereUniqueWithoutHomeInputObjectSchema
                    ),
                    z
                        .lazy(
                            () =>
                                UserUpsertWithWhereUniqueWithoutHomeInputObjectSchema
                        )
                        .array(),
                ])
                .optional(),
            createMany: z
                .lazy(() => UserCreateManyHomeInputEnvelopeObjectSchema)
                .optional(),
            set: z
                .union([
                    z.lazy(() => UserWhereUniqueInputObjectSchema),
                    z.lazy(() => UserWhereUniqueInputObjectSchema).array(),
                ])
                .optional(),
            disconnect: z
                .union([
                    z.lazy(() => UserWhereUniqueInputObjectSchema),
                    z.lazy(() => UserWhereUniqueInputObjectSchema).array(),
                ])
                .optional(),
            delete: z
                .union([
                    z.lazy(() => UserWhereUniqueInputObjectSchema),
                    z.lazy(() => UserWhereUniqueInputObjectSchema).array(),
                ])
                .optional(),
            connect: z
                .union([
                    z.lazy(() => UserWhereUniqueInputObjectSchema),
                    z.lazy(() => UserWhereUniqueInputObjectSchema).array(),
                ])
                .optional(),
            update: z
                .union([
                    z.lazy(
                        () =>
                            UserUpdateWithWhereUniqueWithoutHomeInputObjectSchema
                    ),
                    z
                        .lazy(
                            () =>
                                UserUpdateWithWhereUniqueWithoutHomeInputObjectSchema
                        )
                        .array(),
                ])
                .optional(),
            updateMany: z
                .union([
                    z.lazy(
                        () =>
                            UserUpdateManyWithWhereWithoutHomeInputObjectSchema
                    ),
                    z
                        .lazy(
                            () =>
                                UserUpdateManyWithWhereWithoutHomeInputObjectSchema
                        )
                        .array(),
                ])
                .optional(),
            deleteMany: z
                .union([
                    z.lazy(() => UserScalarWhereInputObjectSchema),
                    z.lazy(() => UserScalarWhereInputObjectSchema).array(),
                ])
                .optional(),
        })
        .strict()

export const UserUncheckedUpdateManyWithoutHomeNestedInputObjectSchema = Schema
