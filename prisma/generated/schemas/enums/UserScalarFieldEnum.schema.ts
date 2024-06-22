import { z } from "zod"

export const UserScalarFieldEnumSchema = z.enum([
    "id",
    "name",
    "email",
    "emailVerified",
    "imageUrl",
    "clerkUserId",
    "points",
    "homeId",
])
