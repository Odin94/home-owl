import { User } from "@clerk/fastify"
import dayjs from "dayjs"
import duration from "dayjs/plugin/duration"
import { ZodIssueCode, z } from "zod"
dayjs.extend(duration)

export const filterUserForClient = (user: User) => {
    return { id: user.id, name: user.username, imageUrl: user.imageUrl }
}

export const getNextDeadline = (
    deadline: Date,
    repeatIntervalMinutes: number,
) => {
    return dayjs(deadline)
        .add(dayjs.duration(repeatIntervalMinutes, "minutes"))
        .toDate()
}

// Used like "z.preprocess(parseJsonPreprocessor, createChoreInput)" to parse strings to json before zod-validating
// (there used to be a bug where fetch sent in strings cause the content-type header wasn't set correctly)
export const parseJsonPreprocessor = (value: any, ctx: z.RefinementCtx) => {
    if (typeof value === "string") {
        try {
            return JSON.parse(value)
        } catch (e) {
            ctx.addIssue({
                code: ZodIssueCode.custom,
                message: (e as Error).message,
            })
        }
    }

    return value
}
