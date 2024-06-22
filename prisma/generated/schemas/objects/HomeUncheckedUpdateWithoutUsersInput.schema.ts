import { z } from "zod"
import { StringFieldUpdateOperationsInputObjectSchema } from "./StringFieldUpdateOperationsInput.schema"
import { DateTimeFieldUpdateOperationsInputObjectSchema } from "./DateTimeFieldUpdateOperationsInput.schema"
import { ChoreUncheckedUpdateManyWithoutHomeNestedInputObjectSchema } from "./ChoreUncheckedUpdateManyWithoutHomeNestedInput.schema"

import type { Prisma } from "@prisma/client"

const Schema: z.ZodType<Prisma.HomeUncheckedUpdateWithoutUsersInput> = z
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
            .lazy(
                () => ChoreUncheckedUpdateManyWithoutHomeNestedInputObjectSchema
            )
            .optional(),
    })
    .strict()

export const HomeUncheckedUpdateWithoutUsersInputObjectSchema = Schema
