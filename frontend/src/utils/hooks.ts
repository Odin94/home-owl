import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import toast from "react-hot-toast"
import { Chore } from "~/utils/types"
import { fetchCreateChoreCompletion } from "./queries"

export const useCompleteChore = (chore: Chore, onSettled?: () => void) => {
    const [isCompleted, setIsCompleted] = useState(false)
    const queryClient = useQueryClient()

    const {
        mutate: completeChore,
        isPending,
        error,
    } = useMutation({
        mutationFn: fetchCreateChoreCompletion,
        onSuccess: () => {
            toast(`Completed ${chore.name}!`)
            queryClient.invalidateQueries({ queryKey: ["chores"] })

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
