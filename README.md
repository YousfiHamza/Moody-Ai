---
<h1 align="center">😁 Moody.Ai 😁</h1>

(Description + Link to Live Preview)
---

# 🔥 Features :

- Nicely Designed UI with `Tailwind CSS`
- Secure Authentication with `Clerk`
- MySQL Database with `PlanetScale`
- Next-Gen ORM with `Prisma`
- AI features with `langchain` & `OpenAi`

# 🚀 Getting started :

You can try to play around with this repo by just cloning this repository and run the following commands inside the project folder:

1. Install the dependencies: `pnpm install`
2. Add the Env Variables :

<em>

- #### .env.local

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=

CLERK_SECRET_KEY=

NEXT_PUBLIC_CLERK_SIGN_IN_URL=

NEXT_PUBLIC_CLERK_SIGN_UP_URL=

NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=

NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=

- #### .env

DATABASE_URL= 'mysql://root:@localhost:3303/{nameOfDB}'

</em>

3. Install PlanetScale-CLI locally.
4. Connect to PlanetScale : `pscale auth login`
5. Switch to your organisation : `pscale org switch {organisation}`
6. Connect to the Database : `pscale connect {nameOfDB} {Branche} --port 3303`
7. On a new terminal, start your dev env : `pnpm dev`
8. open your project on: `http://localhost:3000`

# 👨🏽‍💻 Contributions :

---

Made with ❤️ by <strong>Hamza Y.</strong>
