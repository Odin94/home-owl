import { CapacitorConfig } from "@capacitor/cli"

const config: CapacitorConfig = {
    appId: "de.odinmatthias.homeowl",
    appName: "Home Owl",
    webDir: "out",
    bundledWebRuntime: false,
    server: {
        androidScheme: "https",
        // accounts.dev is clerk; try if it still works after removing this, docs say it's not for prod usage
        // allowNavigation: ["*.accounts.dev"],
    },
    // TODOdin: Seems this breaks all my existing fetches by patching fetch to do androidy things
    // plugins: {
    //     CapacitorHttp: {
    //         enabled: true,
    //     },
    // },
}

export default config
