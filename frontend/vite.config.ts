import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import { TanStackRouterVite } from "@tanstack/router-plugin/vite"

import * as path from "path"

export default defineConfig({
    build: {
        outDir: "build",
    },
    plugins: [react(), TanStackRouterVite()],
    base: "/",
    resolve: {
        alias: {
            "~": path.resolve(__dirname, "src"),
        },
    },
})
