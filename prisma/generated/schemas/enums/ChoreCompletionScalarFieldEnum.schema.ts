import { z } from "zod"

export const ChoreCompletionScalarFieldEnumSchema = z.enum([
    "id",
    "createdAt",
    "completedAt",
    "choreId",
    "choreName",
    "points",
    "completedByUserId",
])
