import dayjs from "dayjs"
import duration from "dayjs/plugin/duration"
dayjs.extend(duration)

export const getNextDeadline = (
    deadline: Date,
    repeatIntervalMinutes: number
) => {
    return dayjs(deadline)
        .add(dayjs.duration(repeatIntervalMinutes, "minutes"))
        .toDate()
}
