# AI Testers – Login via API demo (finish)

Test automation project for the **AI Testers** demo application (`https://aitesters.byst.re`).
Written in Playwright + TypeScript, it uses the Page Object Model pattern and Faker.js
to generate test data.

The main feature of this repo is **logging in via the API instead of the UI form** - the session is
fetched with a single request to the login endpoint and injected into `localStorage`, so that
tests start immediately in a logged-in state, without clicking through the interface.

## Login via API

The application keeps the session exclusively in `localStorage` (no cookies). Logging in comes down to
setting two keys: `token` and `refreshToken`.

Flow:

- **Endpoint:** `POST {BASE_URL}/api/v1/users/signin`
- **Body:** `{ "username": "...", "password": "..." }`
- **Response:** `{ token, refreshToken, username, email, firstName, lastName, roles }`
- `token` is the JWT later used as the `Authorization: Bearer <token>` header.

### How it works in tests

Login happens **automatically** before each test (a fixture with `{ auto: true }`). Tests
navigate straight to a page via the page object's `goTo()` and are immediately authenticated:

```ts
import { expect, test } from '@fixtures/pages';

test('Products page renders mocked products', async ({ productsPage }) => {
  await productsPage.goTo();
  await expect(productsPage.title).toBeVisible();
});
```

To disable auto-login (e.g. for tests of the login form itself):

```ts
test.use({ skipAutoLogin: true });

test('rejects an invalid password with a validation error', async ({ loginPage }) => {
    await loginPage.goTo();
    await loginPage.submit(demoClientUser.username, 'wrong-password');
    await expect(loginPage.errorToast.description).toHaveText('Invalid username/password');
  });
```

## Installation

1. Clone the repository:

```bash
git clone https://github.com/AI-Testers-pl/aitesters-login-via-api-demo.git
cd aitesters-login-via-api-demo
```

2. Install dependencies:

```bash
npm install
```

3. Install the Playwright browsers:

```bash
npx playwright install
```

## Configuration

Copy the template file and fill in the values:

```bash
cp config/.env.local.dist config/.env.local
```

Variables in `config/.env.local`:

- `BASE_URL` - the application address (`https://aitesters.byst.re`)
- `DEMO_USER_CLIENT_USERNAME`, `DEMO_USER_CLIENT_PASSWORD`, `DEMO_USER_CLIENT_DISPLAY_NAME` - client account
- `DEMO_USER_ADMIN_USERNAME`, `DEMO_USER_ADMIN_PASSWORD`, `DEMO_USER_ADMIN_DISPLAY_NAME` - admin account

## Running

```bash
npm run tests:ui          # UI mode
npm run typecheck         # TypeScript type check
npm run check             # Biome: lint + format
npm run check:ci          # Biome in CI mode
npm run format            # Biome: auto-format
```

The Playwright configuration (`playwright.config.ts`) saves a trace, screenshots and a HAR file
(`./har-files/network.har`) - useful when debugging network traffic.

## Skill `/login-via-api`

In `.claude/skills/login-via-api/` there is a skill (for Claude Code) describing the login
flow and a helper script for fetching a JWT outside of tests.

## Conventions

The full project guidelines (`data-testid` locators, grouping locators in page objects, TypeScript
rules, Biome style, fixtures, CI) are described in the [CLAUDE.md](CLAUDE.md) file.
