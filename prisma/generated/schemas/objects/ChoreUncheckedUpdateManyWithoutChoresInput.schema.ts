import { z } from "zod"
import { StringFieldUpdateOperationsInputObjectSchema } from "./StringFieldUpdateOperationsInput.schema"
import { DateTimeFieldUpdateOperationsInputObjectSchema } from "./DateTimeFieldUpdateOperationsInput.schema"
import { IntFieldUpdateOperationsInputObjectSchema } from "./IntFieldUpdateOperationsInput.schema"
import { BoolFieldUpdateOperationsInputObjectSchema } from "./BoolFieldUpdateOperationsInput.schema"

import type { Prisma } from "@prisma/client"

const Schema: z.ZodType<Prisma.ChoreUncheckedUpdateManyWithoutChoresInput> = z
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
        name: z
            .union([
                z.string(),
                z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
            ])
            .optional(),
        description: z
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
        shouldRepeat: z
            .union([
                z.boolean(),
                z.lazy(() => BoolFieldUpdateOperationsInputObjectSchema),
            ])
            .optional(),
        repeatIntervalMinutes: z
            .union([
                z.number(),
                z.lazy(() => IntFieldUpdateOperationsInputObjectSchema),
            ])
            .optional(),
        deadline: z
            .union([
                z.coerce.date(),
                z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
            ])
            .optional(),
    })
    .strict()

export const ChoreUncheckedUpdateManyWithoutChoresInputObjectSchema = Schema
