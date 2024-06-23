import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import toast from "react-hot-toast"
import { Chore } from "~/utils/types"
import { fetchCreateChoreCompletion } from "./queries"

export const useCompleteChore = (chore: Chore, onSettled?: () => void) => {
    const [isCompleted, setIsCompleted] = useState(false)

    const {
        mutate: completeChore,
        isPending,
        error,
    } = useMutation({
        mutationFn: fetchCreateChoreCompletion,
        onSuccess: () => {
            toast(`Completed ${chore.name}!`)
            setIsCompleted(true)
        },
        onError: (err: any) => {
            console.log(err)
            toast.error(`Failed to complete ${chore.name}. Please try again!`)
        },
        onSettled: onSettled,
    })

    return {
        isCompleted,
        setIsCompleted,
        completeChore,
        isLoading: isPending,
        error,
    }
}
