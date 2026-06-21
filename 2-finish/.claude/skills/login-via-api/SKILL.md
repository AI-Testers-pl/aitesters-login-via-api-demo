---
name: login-via-api
description: >-
  Authenticate to the AI_Testers demo app (aitesters.byst.re) via its login API
  instead of the UI form. Use whenever you need an authenticated session — running
  or writing Playwright tests, driving the live app through the Playwright MCP
  browser, or obtaining a JWT for direct API calls. Covers the signin endpoint,
  where the session is stored, and how to seed it.
---

# Login via API

This project authenticates by calling the login API and seeding the returned JWT
into the browser's `localStorage` — there is **no cookie/session**. This skill is
the source of truth for that flow.

## The flow

- **Endpoint:** `POST {BASE_URL}/api/v1/users/signin`
- **Request body (JSON):** `{ "username": "...", "password": "..." }`
- **Response (JSON):** `{ token, refreshToken, username, email, firstName, lastName, roles }`
  - `token` is a JWT, sent on later API calls as `Authorization: Bearer <token>`.
- **Session storage:** the app keeps auth in `localStorage` under two keys —
  `token` and `refreshToken`. No cookies are set. On page load the app reads
  `token` from `localStorage` and is authenticated. Setting these two keys is all
  that's needed.

## Configuration

- `BASE_URL` and credentials live in `config/.env.local` (see `config/.env.local.dist`).
- Demo credentials: client = `DEMO_USER_CLIENT_USERNAME` / `DEMO_USER_CLIENT_PASSWORD`
  (default `client` / `client`); admin = `DEMO_USER_ADMIN_USERNAME` / `DEMO_USER_ADMIN_PASSWORD`.
- In code, credentials come from `demoClientUser` in `src/helpers/users.ts` — never
  hardcode them.

## How to log in

### 1. Inside Playwright tests (default — automatic)

Login already happens automatically. The `loginViaApi` auto fixture in
`src/fixtures/pages.ts` calls `signInViaApi` (`src/helpers/authApi.ts`), seeds
`localStorage`, and lands on the dashboard before the test body runs. Just write the
test — navigate straight to a page via its page object `goTo()`.

- **To disable auto-login** (e.g. tests of the login form itself):
  `test.use({ skipAutoLogin: true });`
- **To get the session/token in a test**, either read the fixture value
  (`async ({ loginViaApi }) => { ... }`, which is the `AuthSession` or `null`) or
  call the helper directly:
  ```ts
  import { signInViaApi } from '@helpers/authApi';
  const session = await signInViaApi(request); // uses demoClientUser by default
  ```

### 2. In a live Playwright MCP browser session

Use this when verifying the app in a real browser. **Do not put credentials in the
browser** — get the session out-of-band (section 3), then seed only the returned
tokens into `localStorage`:

1. Run `scripts/signin.sh` (section 3) and note `token` and `refreshToken` from the
   JSON. Pass `admin` if an admin session is needed.
2. `browser_navigate` to `{BASE_URL}/login` (so the page is on the app origin).
3. `browser_evaluate` to seed the session — tokens only, no username/password:
   ```js
   () => {
     localStorage.setItem('token', '<token from step 1>');
     localStorage.setItem('refreshToken', '<refreshToken from step 1>');
   }
   ```
4. `browser_navigate` to `{BASE_URL}/` and confirm the dashboard renders (the
   `home-welcome-title` element shows `Welcome, <FirstName>!`).

### 3. Standalone — just get a JWT / session

Run the bundled script with the Bash tool. It sources credentials from
`config/.env.local` (so they never appear in the command), calls the signin
endpoint, and prints the full response JSON — `token`, `refreshToken`, and profile
fields:

```bash
bash .claude/skills/login-via-api/scripts/signin.sh         # client (default)
bash .claude/skills/login-via-api/scripts/signin.sh admin   # admin
```

Read `token` / `refreshToken` straight from the JSON. To call the endpoint by hand
instead, `POST {BASE_URL}/api/v1/users/signin` with `{ "username", "password" }` and
`content-type: application/json` — no auth header or cookie needed to sign in.

## Notes

- Keep `src/helpers/authApi.ts` as the canonical implementation for test code; this
  skill mirrors it for non-test contexts.
- The session is JWT-in-`localStorage` only — no cookie — so seeding the three keys
  is the whole login.
