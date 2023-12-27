import { CapacitorConfig } from "@capacitor/cli"

const config: CapacitorConfig = {
    appId: "de.odinmatthias.homeowl",
    appName: "Home Owl",
    webDir: "out",
    bundledWebRuntime: false,
    server: {
        androidScheme: "https",
    },
}

export default config
