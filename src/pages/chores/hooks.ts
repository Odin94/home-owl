import { Chore } from "@prisma/client"
import { useState } from "react"
import toast from "react-hot-toast"
import { api } from "~/utils/api"

export const useCompleteChore = (chore: Chore) => {
    const [isCompleted, setIsCompleted] = useState(false)

    const {
        mutate: completeChore,
        isLoading,
        error,
    } = api.choreCompletions.create.useMutation({
        onSuccess: () => {
            toast(`Completed ${chore.name}!`)
            setIsCompleted(true)
        },
        onError: (err) => {
            console.log(err)
            toast.error(`Failed to complete ${chore.name}. Please try again!`)
        },
    })

    return { isCompleted, setIsCompleted, completeChore, isLoading, error }
}
