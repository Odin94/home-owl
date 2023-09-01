# Home Owl 🦉

Home Owl is a household chore tracker. Create (recurring) chores, mark them as completed and collect points!

Home Owl makes it fun and easy to keep track of who does how much work around the house. To create a fair workload distribution and a happy and relaxed vibe around chores.



<!-- Notes to self
* Stopped here: https://youtu.be/YkOSUVzOAA4?t=1396  (run npx prisma db push against awake DB)

* Find a hosted database service (maybe supabase?) with automated backups
  * https://www.prisma.io/docs/guides/database/supabase
  * https://authjs.dev/reference/adapter/supabase

* Consider Flutter for all frontends..?
  -->


# Used tech
* [T3 Stack](https://create.t3.gg/) / `create-t3-app` to initialize project
* [[Planetscale](https://planetscale.com) for database
  * Prisma ORM (`npx prisma studio`, `npx prisma db push`)
* [Vercel](vercel.com) for deployment
* [Clerk](https://clerk.com) for auth
  * Next-auth

# Create T3 App

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

## What's next? How do I make an app with this?

We try to keep this project as simple as possible, so you can start with just the scaffolding we set up for you, and add additional things later when they become necessary.

If you are not familiar with the different technologies used in this project, please refer to the respective docs. If you still are in the wind, please join our [Discord](https://t3.gg/discord) and ask for help.

- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)

## Learn More

To learn more about the [T3 Stack](https://create.t3.gg/), take a look at the following resources:

- [Documentation](https://create.t3.gg/)
- [Learn the T3 Stack](https://create.t3.gg/en/faq#what-learning-resources-are-currently-available) — Check out these awesome tutorials

You can check out the [create-t3-app GitHub repository](https://github.com/t3-oss/create-t3-app) — your feedback and contributions are welcome!

## How do I deploy this?

Follow our deployment guides for [Vercel](https://create.t3.gg/en/deployment/vercel), [Netlify](https://create.t3.gg/en/deployment/netlify) and [Docker](https://create.t3.gg/en/deployment/docker) for more information.
