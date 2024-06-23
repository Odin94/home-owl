import {
    Chore,
    ChoreGetPayload,
    ChoreModel,
    CreateChoreSubmitValues,
    HomeWithUsers,
    HomeWithUsersModel,
    UserModel,
    UserWithChoreCompletions,
    UserWithChoreCompletionsModel,
} from "./utils/types"

// TODO: Get from env
const basePath = "http://localhost:8080"

const doFetch = async (
    path: string,
    method: "GET" | "POST",
    body: object = {},
) => {
    const response = await fetch(`${basePath}${path}`, {
        method: method,
        credentials: "include",
        body: JSON.stringify(body),
    })
    if (!response.ok) {
        throw new Error(
            "Network response was not ok " + response.statusText.toUpperCase(),
        )
    }
    return response.json()
}

// Homes

export const fetchGetMyHome = async (): Promise<HomeWithUsers> => {
    const response = await doFetch("/homes/getMyHome", "GET")
    const myHome = HomeWithUsersModel.parse(response)

    return myHome
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

// Users

export const fetchGetMyUser = async () => {
    const response = await doFetch("/users/getMyUser", "GET")
    const user = UserModel.parse(response)

    return user
}

export const fetchCreateUser = async () => {
    return doFetch("/users/createUser", "POST")
}

// Chores

export const fetchCreateChore = async (values: CreateChoreSubmitValues) => {
    return doFetch("/chores/createChore", "POST", values)
}

export const fetchGetMyChores = async () => {
    const response = await doFetch("/chores/getMyChores", "GET")
    const chores = response.map((chore: unknown) => ChoreModel.parse(chore))

    // TODO: fix type
    return chores as Chore[]
}

export const fetchGetChore = async (id: string): Promise<Chore> => {
    const response = await doFetch(`/chores/${id}`, "GET")
    const chore = ChoreModel.parse(response)

    // TODO: fix type
    return chore as Chore
}

export const fetchUpdateChore = async (updatedChore: ChoreGetPayload) => {
    return doFetch("/chores/updateChore", "POST", updatedChore)
}

export const fetchDeleteChore = async ({ id }: { id: string }) => {
    return doFetch("/chores/deleteChore", "POST", { id })
}

// Chore Completions

export const fetchDeleteChoreCompletion = async ({ id }: { id: string }) => {
    return doFetch("/choreCompletions/deleteChoreCompletion", "POST", { id })
}
