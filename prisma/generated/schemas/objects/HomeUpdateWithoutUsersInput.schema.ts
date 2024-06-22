import { z } from "zod"
import { StringFieldUpdateOperationsInputObjectSchema } from "./StringFieldUpdateOperationsInput.schema"
import { DateTimeFieldUpdateOperationsInputObjectSchema } from "./DateTimeFieldUpdateOperationsInput.schema"
import { ChoreUpdateManyWithoutHomeNestedInputObjectSchema } from "./ChoreUpdateManyWithoutHomeNestedInput.schema"

import type { Prisma } from "@prisma/client"

const Schema: z.ZodType<Prisma.HomeUpdateWithoutUsersInput> = z
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
        chores: z
            .lazy(() => ChoreUpdateManyWithoutHomeNestedInputObjectSchema)
            .optional(),
    })
    .strict()

export const HomeUpdateWithoutUsersInputObjectSchema = Schema
