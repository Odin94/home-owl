import { z } from "zod"
import { StringFieldUpdateOperationsInputObjectSchema } from "./StringFieldUpdateOperationsInput.schema"
import { DateTimeFieldUpdateOperationsInputObjectSchema } from "./DateTimeFieldUpdateOperationsInput.schema"
import { UserUpdateManyWithoutHomeNestedInputObjectSchema } from "./UserUpdateManyWithoutHomeNestedInput.schema"

import type { Prisma } from "@prisma/client"

const Schema: z.ZodType<Prisma.HomeUpdateWithoutChoresInput> = z
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
    })
    .strict()

export const HomeUpdateWithoutChoresInputObjectSchema = Schema
