import { ClerkProvider } from "@clerk/clerk-react"
import { MantineProvider, createTheme } from "@mantine/core"
import { ModalsProvider } from "@mantine/modals"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { RouterProvider, createRouter } from "@tanstack/react-router"
import { StrictMode } from "react"
import ReactDOM from "react-dom/client"
import { Toaster } from "react-hot-toast"
// Import the generated route tree
import { routeTree } from "~/routeTree.gen"
import "~/styles/globals.css"

// Create a new router instance
const router = createRouter({ routeTree })

// Register the router instance for type safety
declare module "@tanstack/react-router" {
    interface Register {
        router: typeof router
    }
}

const queryClient = new QueryClient()
// TODO: Add cool configs like in parent that are validated on startup
const PUBLISHABLE_KEY = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY!

const App = () => {
    const navigate = router.navigate

    return (
        <ClerkProvider
            routerPush={(to) => navigate({ to })}
            routerReplace={(to) => navigate({ to, replace: true })}
            publishableKey={PUBLISHABLE_KEY}
        >
            <Toaster position="bottom-center" />

            <RouterProvider router={router} />
        </ClerkProvider>
    )
}

// Render the app
const rootElement = document.getElementById("root")!
if (!rootElement.innerHTML) {
    const root = ReactDOM.createRoot(rootElement)
    root.render(
        <StrictMode>
            <MantineProvider defaultColorScheme="light" theme={createTheme({})}>
                <ModalsProvider>
                    <QueryClientProvider client={queryClient}>
                        <App />
                    </QueryClientProvider>
                </ModalsProvider>
            </MantineProvider>
        </StrictMode>,
    )
}
