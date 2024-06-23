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

// TODO: Get from env like below
const basePath = "http://localhost:8080"

// export const getBaseUrl = () => {
//     // TODO: Use env var or something instead of hardcoded https://home-owl.odin-matthias.de
//     // if (Capacitor.isNativePlatform()) return `https://home-owl.odin-matthias.de`
//     if (typeof window !== "undefined") return "" // browser should use relative url
//     if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}` // SSR should use vercel url
//     return `http://localhost:${process.env.PORT ?? 3000}` // dev SSR should use localhost
// }

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
          }
        : {
              method: method,
              credentials: "include",
          }
    const response = await fetch(`${basePath}${path}`, opts)
    if (!response.ok) {
        throw new Error(
            "Network response was not ok " + response.statusText.toUpperCase(),
        )
    }
    return response.json()
}

// Homes

export const fetchGetMyHome = async (): Promise<HomeWithUsers> => {
    const response = await doFetch("/homes/me", "GET")
    const myHome = HomeWithUsersModel.parse(response)

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

export const fetchDeleteChore = async ({ id }: { id: string }) => {
    return doFetch("/chores/delete", "POST", { id })
}

// Chore Completions

export const fetchDeleteChoreCompletion = async ({ id }: { id: string }) => {
    return doFetch("/chore-completions/delete", "POST", {
        choreCompletionId: id,
    })
}

export const fetchCreateChoreCompletion = async (
    choreCompletion: ChoreCompletionInput,
) => {
    return doFetch("/chore-completions", "POST", choreCompletion)
}
