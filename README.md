# Home Owl 🦉

Home Owl is a household chore tracker. Create (recurring) chores, mark them as completed and collect points!

Home Owl makes it fun and easy to keep track of who does how much work around the house. To create a fair workload distribution and a happy and relaxed vibe around chores.

The project is split into a [frontend](./frontend/), a [backend](./backend/) and a database (see [docker-compose.yml](./docker-compose.yml))

## How to run
* Clerk auth & upstash redis -> fill `.env` files based on `.env.sample` in `frontend` and `backend`
* `docker compose up -d` to get local db running
* `npm i --legacy-peer-deps` and `npm start` in `backend` and `frontend`
* To quickly run everything at once you can also run `./run_all.sh`

## How to deploy
* Get a cloud database (eg. [neon](https://neon.tech)) and add it's connection url to `./backend/.env` under `DATABASE_URL`
* Get a server and run the backend on it
* Get a static site host (eg. [netlify](https://www.netlify.com)) and point it to `./frontend`. Remember to configure environment variables like in `./frontend/.env`

<!-- ## How to build Android app
* `npm run static` to produce a static frontend build (must be static for capacitor)
* `npx cap sync` to sync built web app to mobile apps
* `npx cap open android` to open android studio, build and debug android app from there
* Use chrome debugger (vivaldi://inspect/#devices) for debugging https://capacitorjs.com/docs/vscode/debugging -->

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


## Credits
* Jellyfish Icon [Flat Icons](https://www.flaticon.com/free-icons/jellyfish)
