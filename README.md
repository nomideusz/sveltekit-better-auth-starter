# SvelteKit + Better Auth + Postgres starter

A minimal, production-shaped SvelteKit app: sign-in / password reset / email
verification (Better Auth), Postgres via Drizzle with migrations, URL-locale
i18n (`/`, `/pl`, `/de`, `/uk`, `/es`), transactional email, security headers, a health endpoint
and one protected area. Everything else is yours to add.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/new/template/sveltekit-better-auth-starter?utm_medium=integration&utm_source=button&utm_campaign=sveltekit-better-auth-starter)

> Built on `@sveltejs/kit` **3.0.0-next** (pre-release) and Svelte 5.

## What's inside

| | |
|---|---|
| Framework | SvelteKit 3 (kit config lives in `vite.config.ts` — there is no `svelte.config.js`), Svelte 5 runes, Tailwind CSS 4 |
| Auth | [Better Auth](https://better-auth.com) — email + password, admin plugin, password reset, email verification; forms call `getAuth().api.*` server-side |
| Database | Postgres + Drizzle ORM; `user` is Better Auth's user table (add your columns there) |
| i18n | [`@nomideusz/svelte-i18n`](https://www.npmjs.com/package/@nomideusz/svelte-i18n) — default locale un-prefixed, others at `/<locale>/*`, one server hook |
| Email | [`@nomideusz/svelte-notify`](https://www.npmjs.com/package/@nomideusz/svelte-notify) templates; transport = Resend HTTP API (`RESEND_API_KEY`) or SMTP; logs instead of sending when neither is set |

## Deploy on Railway

The template provisions Postgres and this app. Variables:

| Variable | Value |
|---|---|
| `DATABASE_URL` | `${{Postgres.DATABASE_URL}}` |
| `ORIGIN` | `https://${{RAILWAY_PUBLIC_DOMAIN}}` |
| `BETTER_AUTH_SECRET` | generated |
| `ADMIN_EMAIL` | **you fill this in** |
| `ADMIN_PASSWORD` | generated — read it in the service's Variables tab, sign in at `/auth/login`, then change it |
| `ALLOW_SIGNUP` | `false` by default (admin creates accounts); `true` opens `/auth/signup` with email verification |
| `RESEND_API_KEY` | optional — email over Resend's HTTP API. **Use this on Railway's Hobby plan: outbound SMTP ports (25/465/587) are blocked there and SMTP times out.** `SMTP_FROM` is the sender address (a verified Resend domain, or `onboarding@resend.dev` for tests) |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASSWORD`, `SMTP_FROM`, `SMTP_FROM_NAME` | optional — SMTP transport (needs a plan/host where the port is reachable). With neither set, password-reset / verification emails are logged, not sent |

On every deploy: `node scripts/migrate.mjs` applies migrations, then
`scripts/bootstrap-admin.mjs` creates the admin once (no-op if the email exists).

## Local

```bash
cp .env.example .env         # fill DATABASE_URL, BETTER_AUTH_SECRET
pnpm install
pnpm db:generate             # after schema changes
node scripts/migrate.mjs
ADMIN_EMAIL=you@example.com ADMIN_PASSWORD=change-me pnpm admin:create
pnpm dev
```

## Layout

```
src/env.ts                    every env var, declared (kit 3)
src/hooks.ts                  locale reroute
src/hooks.server.ts           locale handle · session → locals.user · security headers
src/lib/i18n*.ts, messages/   i18n setup (routing config is the single source of truth)
src/lib/server/db/            drizzle + postgres, Better Auth tables
src/lib/server/auth.ts        Better Auth config
src/lib/server/email.ts       notifier + mailer, bound once
src/routes/auth/*             login · signup (ALLOW_SIGNUP) · logout · forgot-password · reset-password · verify
src/routes/api/auth/[...all]  Better Auth HTTP surface (emailed links land here)
src/routes/app/*              protected area
```

## License

MIT
