import { z } from "zod"
import { StringFieldUpdateOperationsInputObjectSchema } from "./StringFieldUpdateOperationsInput.schema"
import { DateTimeFieldUpdateOperationsInputObjectSchema } from "./DateTimeFieldUpdateOperationsInput.schema"
import { NullableStringFieldUpdateOperationsInputObjectSchema } from "./NullableStringFieldUpdateOperationsInput.schema"
import { IntFieldUpdateOperationsInputObjectSchema } from "./IntFieldUpdateOperationsInput.schema"
import { ChoreUpdateOneWithoutChoreCompletionsNestedInputObjectSchema } from "./ChoreUpdateOneWithoutChoreCompletionsNestedInput.schema"
import { UserUpdateOneRequiredWithoutChoreCompletionsNestedInputObjectSchema } from "./UserUpdateOneRequiredWithoutChoreCompletionsNestedInput.schema"

import type { Prisma } from "@prisma/client"

const Schema: z.ZodType<Prisma.ChoreCompletionUpdateInput> = z
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
                z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
            ])
            .optional(),
        completedAt: z
            .union([
                z.coerce.date(),
                z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
            ])
            .optional(),
        choreName: z
            .union([
                z.string(),
                z.lazy(
                    () => NullableStringFieldUpdateOperationsInputObjectSchema
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
        chore: z
            .lazy(
                () =>
                    ChoreUpdateOneWithoutChoreCompletionsNestedInputObjectSchema
            )
            .optional(),
        completedByUser: z
            .lazy(
                () =>
                    UserUpdateOneRequiredWithoutChoreCompletionsNestedInputObjectSchema
            )
            .optional(),
    })
    .strict()

export const ChoreCompletionUpdateInputObjectSchema = Schema
