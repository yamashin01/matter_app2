# Name

This project is for matter management of organization.

# Features

- customize format for organization
- simple visualization

# Requirement

- yarn
- tailwindcss
- mantine
- prettier
- eslint
- storybook
- supabase

# Installation

1. clone matter-app

```bash
git init
git clone https://github.com/yamashin01/matter_app2.git
cd matter-app2
```

2. install tailwindcss

```bash
npm install -D tailwindcss postcss autoprefixer
```

3. install eslint

```bash
npx eslint --init
```

4. install prettier

```bash
npm install --save-dev prettier eslint-config-prettier
```

5. install storybook

```bash
npx -p @storybook/cli sb init
yarn add -D @storybook/addon-postcss@latest
```

6. install mantine

```bash
yarn add @mantine/hooks @mantine/form @mantine/core @mantine/next @mantine/form
```

7. install supabase

```bash
yarn add @supabase/ui
```

# setting

- create .env.local file.<br>
  The url and anon key can be got from the setting page of the project in supabase site.<br>
  project page in supabase > setting > API > `URL` and `API Keys`

```
NEXT_PUBLIC_SUPABASE_URL=https://XXXXX.supabase.co
NEXT_PUBLIC_SUPABSE_KEY=XXXXXXXXXX
```

---

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
