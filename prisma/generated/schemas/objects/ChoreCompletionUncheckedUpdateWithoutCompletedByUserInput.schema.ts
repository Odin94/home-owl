import { z } from "zod"
import { StringFieldUpdateOperationsInputObjectSchema } from "./StringFieldUpdateOperationsInput.schema"
import { DateTimeFieldUpdateOperationsInputObjectSchema } from "./DateTimeFieldUpdateOperationsInput.schema"
import { NullableStringFieldUpdateOperationsInputObjectSchema } from "./NullableStringFieldUpdateOperationsInput.schema"
import { IntFieldUpdateOperationsInputObjectSchema } from "./IntFieldUpdateOperationsInput.schema"

import type { Prisma } from "@prisma/client"

const Schema: z.ZodType<Prisma.ChoreCompletionUncheckedUpdateWithoutCompletedByUserInput> =
    z
        .object({
            id: z
                .union([
                    z.string(),
                    z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
                ])
                .optional(),
            createdAt: z
                .union([
                    z.coerce.date(),
                    z.lazy(
                        () => DateTimeFieldUpdateOperationsInputObjectSchema
                    ),
                ])
                .optional(),
            completedAt: z
                .union([
                    z.coerce.date(),
                    z.lazy(
                        () => DateTimeFieldUpdateOperationsInputObjectSchema
                    ),
                ])
                .optional(),
            choreId: z
                .union([
                    z.string(),
                    z.lazy(
                        () =>
                            NullableStringFieldUpdateOperationsInputObjectSchema
                    ),
                ])
                .optional()
                .nullable(),
            choreName: z
                .union([
                    z.string(),
                    z.lazy(
                        () =>
                            NullableStringFieldUpdateOperationsInputObjectSchema
                    ),
                ])
                .optional()
                .nullable(),
            points: z
                .union([
                    z.number(),
                    z.lazy(() => IntFieldUpdateOperationsInputObjectSchema),
                ])
                .optional(),
        })
        .strict()

export const ChoreCompletionUncheckedUpdateWithoutCompletedByUserInputObjectSchema =
    Schema
