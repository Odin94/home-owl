import { ClerkProvider } from "@clerk/clerk-react"
import { MantineProvider } from "@mantine/core"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import {
    Link,
    Outlet,
    createRootRoute,
    useNavigate,
} from "@tanstack/react-router"
import { TanStackRouterDevtools } from "@tanstack/router-devtools"
// Import the generated route tree

const queryClient = new QueryClient()
// TODO: Add cool configs like in parent that are validated on startup
const PUBLISHABLE_KEY = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY!

const RootApp = () => {
    const navigate = useNavigate()

    return (
        <>
            <div className="flex gap-2 p-2">
                <Link to="/" className="[&.active]:font-bold">
                    Home
                </Link>{" "}
                <Link to="/landing" className="[&.active]:font-bold">
                    Landing
                </Link>
            </div>
            <hr />
            <Outlet />
            <TanStackRouterDevtools />
        </>
    )
}

export const Route = createRootRoute({
    component: () => {
        return <RootApp />
    },
})
