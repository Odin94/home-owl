import { Link, Outlet, createRootRoute } from "@tanstack/react-router"
import { TanStackRouterDevtools } from "@tanstack/router-devtools"

const RootApp = () => {
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
