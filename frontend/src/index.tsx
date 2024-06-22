// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';

// const root = ReactDOM.createRoot(
//   document.getElementById('root') as HTMLElement
// );
// root.render(
//   <React.StrictMode>
//     <div>REACT NORMAL INDEX</div>
//     <App />
//   </React.StrictMode>
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
import { ClerkProvider } from "@clerk/clerk-react"
import { MantineProvider } from "@mantine/core"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import {
    RouterProvider,
    createRouter,
    useNavigate,
} from "@tanstack/react-router"
import { StrictMode } from "react"
import ReactDOM from "react-dom/client"
import "./App.css"
// Import the generated route tree
import { routeTree } from "~/routeTree.gen"

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
    const navigate = useNavigate()

    return (
        <ClerkProvider
            routerPush={(to) => navigate({ to })}
            routerReplace={(to) => navigate({ to, replace: true })}
            publishableKey={PUBLISHABLE_KEY}
        >
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
            <MantineProvider>
                <QueryClientProvider client={queryClient}>
                    <App />
                </QueryClientProvider>
            </MantineProvider>
        </StrictMode>,
    )
}
