import { z } from "zod"
import { StringFieldUpdateOperationsInputObjectSchema } from "./StringFieldUpdateOperationsInput.schema"
import { DateTimeFieldUpdateOperationsInputObjectSchema } from "./DateTimeFieldUpdateOperationsInput.schema"
import { UserUncheckedUpdateManyWithoutHomeNestedInputObjectSchema } from "./UserUncheckedUpdateManyWithoutHomeNestedInput.schema"

import type { Prisma } from "@prisma/client"

const Schema: z.ZodType<Prisma.HomeUncheckedUpdateWithoutChoresInput> = z
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
            .lazy(
                () => UserUncheckedUpdateManyWithoutHomeNestedInputObjectSchema
            )
            .optional(),
    })
    .strict()

export const HomeUncheckedUpdateWithoutChoresInputObjectSchema = Schema
