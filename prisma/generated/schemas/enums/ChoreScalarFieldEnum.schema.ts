import { z } from "zod"

export const ChoreScalarFieldEnumSchema = z.enum([
    "id",
    "createdAt",
    "name",
    "description",
    "points",
    "shouldRepeat",
    "repeatIntervalMinutes",
    "deadline",
    "homeId",
])
