import {
    Chore,
    ChoreCompletionInput,
    ChoreModel,
    CreateChoreSubmitValues,
    HomeWithUsers,
    HomeWithUsersModel,
    UpdateChoreSubmitValues,
    UserModel,
    UserWithChoreCompletions,
    UserWithChoreCompletionsModel,
} from "~/utils/types"
import { getConfigs } from "./config"

const basePath = getConfigs().VITE_BASE_URL

const doFetch = async (
    path: string,
    method: "GET" | "POST",
    body: object | undefined = undefined,
) => {
    const opts: RequestInit = body
        ? {
              method: method,
              credentials: "include",
              body: JSON.stringify(body),
              headers: {
                  "Content-Type": "application/json",
              },
          }
        : {
              method: method,
              credentials: "include",
          }
    const response = await fetch(`${basePath}${path}`, opts)
    if (!response.ok) {
        let errorMessage = response.statusText.toUpperCase()
        try {
            const errorBody = await response.text()
            if (errorBody) {
                errorMessage = errorBody
            }
        } catch {
            // If we can't read the body, use the status text
        }
        const error = new Error("Network response was not ok " + errorMessage)
        ;(error as any).status = response.status
        throw error
    }
    return response.json()
}

// Homes

export const fetchGetMyHome = async (): Promise<HomeWithUsers | null> => {
    const basePath = getConfigs().VITE_BASE_URL
    const response = await fetch(`${basePath}/homes/me`, {
        method: "GET",
        credentials: "include",
    })

    if (response.status === 404) {
        return null
    }

    if (!response.ok) {
        throw new Error(
            "Network response was not ok " + response.statusText.toUpperCase(),
        )
    }

    const data = await response.json()
    const myHome = HomeWithUsersModel.parse(data)
    return myHome
}

export const fetchCreateHome = async () => {
    return doFetch("/homes", "POST")
}

export const fetchGetUsersWithChoreCompletionsInMyHome = async (): Promise<
    UserWithChoreCompletions[]
> => {
    const response = await doFetch(
        "/homes/getUsersWithChoreCompletionsInMyHome",
        "GET",
    )
    const usersWithChoreCompletionsInsMyHome = response.map((u: any) =>
        UserWithChoreCompletionsModel.parse(u),
    )

    return usersWithChoreCompletionsInsMyHome
}

export const fetchAddUserToHome = async (username: string) => {
    return doFetch("/homes/addUserToMyHome", "POST", { username })
}

// Users

export const fetchGetMyUser = async () => {
    const response = await doFetch("/users/me", "GET")
    const user = UserModel.parse(response)

    return user
}

export const fetchCreateUser = async () => {
    return doFetch("/users", "POST")
}

// Chores

export const fetchGetMyChores = async (): Promise<Chore[]> => {
    const response = await doFetch("/chores/me", "GET")
    const chores = response.map((chore: unknown) => ChoreModel.parse(chore))

    return chores
}

export const fetchGetChore = async (id: string) => {
    const response = await doFetch(`/chores/${id}`, "GET")
    const chore = ChoreModel.parse(response)

    return chore
}

export const fetchCreateChore = async (values: CreateChoreSubmitValues) => {
    return doFetch("/chores", "POST", values)
}

export const fetchUpdateChore = async (
    updatedChore: UpdateChoreSubmitValues,
) => {
    return doFetch("/chores/update", "POST", updatedChore)
}

export const fetchDeleteChore = async (id: string) => {
    return doFetch("/chores/delete", "POST", { id })
}

// Chore Completions

export const fetchDeleteChoreCompletion = async (id: string) => {
    return doFetch("/chore-completions/delete", "POST", {
        choreCompletionId: id,
    })
}

export const fetchCreateChoreCompletion = async (
    choreCompletion: ChoreCompletionInput,
) => {
    return doFetch("/chore-completions", "POST", choreCompletion)
}
