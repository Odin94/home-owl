import { z } from "zod"
import { StringFieldUpdateOperationsInputObjectSchema } from "./StringFieldUpdateOperationsInput.schema"
import { NullableStringFieldUpdateOperationsInputObjectSchema } from "./NullableStringFieldUpdateOperationsInput.schema"
import { NullableDateTimeFieldUpdateOperationsInputObjectSchema } from "./NullableDateTimeFieldUpdateOperationsInput.schema"
import { IntFieldUpdateOperationsInputObjectSchema } from "./IntFieldUpdateOperationsInput.schema"

import type { Prisma } from "@prisma/client"

const Schema: z.ZodType<Prisma.UserUpdateManyMutationInput> = z
    .object({
        id: z
            .union([
                z.string(),
                z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
            ])
            .optional(),
        name: z
            .union([
                z.string(),
                z.lazy(
                    () => NullableStringFieldUpdateOperationsInputObjectSchema
                ),
            ])
            .optional()
            .nullable(),
        email: z
            .union([
                z.string(),
                z.lazy(
                    () => NullableStringFieldUpdateOperationsInputObjectSchema
                ),
            ])
            .optional()
            .nullable(),
        emailVerified: z
            .union([
                z.coerce.date(),
                z.lazy(
                    () => NullableDateTimeFieldUpdateOperationsInputObjectSchema
                ),
            ])
            .optional()
            .nullable(),
        imageUrl: z
            .union([
                z.string(),
                z.lazy(
                    () => NullableStringFieldUpdateOperationsInputObjectSchema
                ),
            ])
            .optional()
            .nullable(),
        clerkUserId: z
            .union([
                z.string(),
                z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
            ])
            .optional(),
        points: z
            .union([
                z.number(),
                z.lazy(() => IntFieldUpdateOperationsInputObjectSchema),
            ])
            .optional(),
    })
    .strict()

export const UserUpdateManyMutationInputObjectSchema = Schema
