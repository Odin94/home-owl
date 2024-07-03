import { z } from "zod"

const ConfigModel = z.object({
    REACT_APP_BASE_URL: z.string().url(),
    REACT_APP_CLERK_PUBLISHABLE_KEY: z.string().min(1),
    REACT_APP_CLERK_SIGN_IN_URL: z.string().min(1),
    REACT_APP_CLERK_SIGN_UP_URL: z.string().min(1),
})

export type Configs = Zod.infer<typeof ConfigModel>

let configs: Configs | undefined = undefined

// Make sure to keep `import "dotenv/config"` at the topic of the index file to load env vars
export const getConfigs = (): Configs => {
    if (!configs) configs = ConfigModel.parse(process.env)
    return configs
}
