import { Outlet, createRootRoute, useNavigate } from "@tanstack/react-router"
import { TanStackRouterDevtools } from "@tanstack/router-devtools"
import { useEffect } from "react"
import "~/styles/globals.css"

const RootApp = () => {
    const navigate = useNavigate()
    useEffect(() => {
        navigate({ to: "/landing" })
    }, [navigate])
    return (
        <>
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
