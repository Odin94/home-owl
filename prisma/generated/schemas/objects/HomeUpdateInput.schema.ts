import { z } from "zod"
import { StringFieldUpdateOperationsInputObjectSchema } from "./StringFieldUpdateOperationsInput.schema"
import { DateTimeFieldUpdateOperationsInputObjectSchema } from "./DateTimeFieldUpdateOperationsInput.schema"
import { UserUpdateManyWithoutHomeNestedInputObjectSchema } from "./UserUpdateManyWithoutHomeNestedInput.schema"
import { ChoreUpdateManyWithoutHomeNestedInputObjectSchema } from "./ChoreUpdateManyWithoutHomeNestedInput.schema"

import type { Prisma } from "@prisma/client"

const Schema: z.ZodType<Prisma.HomeUpdateInput> = z
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
        users: z
            .lazy(() => UserUpdateManyWithoutHomeNestedInputObjectSchema)
            .optional(),
        chores: z
            .lazy(() => ChoreUpdateManyWithoutHomeNestedInputObjectSchema)
            .optional(),
    })
    .strict()

export const HomeUpdateInputObjectSchema = Schema
