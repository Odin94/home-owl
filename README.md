# Home Owl 🦉

Home Owl is a household chore tracker. Create (recurring) chores, mark them as completed and collect points!

Home Owl makes it fun and easy to keep track of who does how much work around the house. To create a fair workload distribution and a happy and relaxed vibe around chores.


## How to run web app
* Create planetscale database, clerk auth & upstash redis -> fill `.env` file based on `.env.sample`
* `docker compose up -d` to get local db running
* `npm run dev` for running in dev mode


## How to build Android app
* `npm run static` to produce a static frontend build (must be static for capacitor)
* `npx cap sync` to sync built web app to mobile apps
* `npx cap open android` to open android studio, build and debug android app from there
* Use chrome debugger (vivaldi://inspect/#devices) for debugging https://capacitorjs.com/docs/vscode/debugging

<!-- Notes to self
* https://youtu.be/YkOSUVzOAA4

* Find a hosted database service (maybe supabase?) with automated backups
  * https://www.prisma.io/docs/guides/database/supabase
  * https://authjs.dev/reference/adapter/supabase

* Consider Flutter for all frontends..?
  -->

<!--
TODOs:
* Make page pretty on mobile
* Make skipping chores snappier (remove delay from update function, but only for skipping)
* Add an export-all-data button
* Allow setting custom names?

Stretch goals:
* Add chore-edit-history (for tracking and undoing)
* Build a mobile / desktop app?
  * Consider https://capacitorjs.com / https://github.com/emadgit/create-t3-mobile-app
 -->

# Used tech

-   [T3 Stack](https://create.t3.gg/) / `create-t3-app` to initialize project
-   [[Planetscale](https://planetscale.com) for database
    -   Prisma ORM (`npx prisma studio`, `npx prisma db push`)
-   [Vercel](vercel.com) for deployment
-   [Clerk](https://clerk.com) for auth
    -   Next-auth
-   [Capacitor](https://capacitorjs.com/) for generating mobile applications (atm only android)


# Create T3 App

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

## What's next? How do I make an app with this?

We try to keep this project as simple as possible, so you can start with just the scaffolding we set up for you, and add additional things later when they become necessary.

If you are not familiar with the different technologies used in this project, please refer to the respective docs. If you still are in the wind, please join our [Discord](https://t3.gg/discord) and ask for help.

-   [Next.js](https://nextjs.org)
-   [NextAuth.js](https://next-auth.js.org)
-   [Prisma](https://prisma.io)
-   [Tailwind CSS](https://tailwindcss.com)
-   [tRPC](https://trpc.io)

## How do I deploy this?

Follow our deployment guides for [Vercel](https://create.t3.gg/en/deployment/vercel), [Netlify](https://create.t3.gg/en/deployment/netlify) and [Docker](https://create.t3.gg/en/deployment/docker) for more information.


## Credits
* Jellyfish Icon [Flat Icons](https://www.flaticon.com/free-icons/jellyfish)
