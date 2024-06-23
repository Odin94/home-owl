import { User } from "@clerk/fastify"
import dayjs from "dayjs"
import duration from "dayjs/plugin/duration"
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
