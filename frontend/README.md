# Home Owl 🦉 - Frontend
Typescript react frontend using TanStack router and query, mantine and tailwind for components and design, and vite for bundling.

It connects to a backend URL and port defined in `.env` and uses [Clerk](https://clerk.com) for authentication.


## Setup
* `npm i` to install dependencies
* Copy `.env.sample` into `.env` and add your clerk key
  * If you're running the backend without vite, change the port for `VITE_BASE_URL` to 8080

## Run
* `npm start`
