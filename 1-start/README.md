# AI Testers – Login via API demo (start)

**Starting point** of the webinar from **18.06.2026** - this is the project state we begin from.

Test automation project for the **AI Testers** demo application (`https://aitesters.byst.re`).
Written in Playwright + TypeScript, it uses the Page Object Model pattern and Faker.js to
generate test data.

At this stage, tests **log in through the UI form** - a fixture fills in the username and
password and clicks the sign-in button before each test. During the webinar we switch this flow
to logging in **via the API**.

## The task

The file [`PROMPT.md`](PROMPT.md) contains the prompt we start the work from: analyze the
repository and switch the test login flow to API-based authentication (a `loginViaApi` fixture
plus a `skipAutoLogin` flag for tests of the login form itself).

> The finished result lives in the `2-finish/` folder, which also ships a **bonus** Claude Code
> skill (`login-via-api`).

## Installation

1. Clone the repository and enter this folder:

```bash
git clone https://github.com/AI-Testers-pl/aitesters-login-via-api-demo.git
cd aitesters-login-via-api-demo/1-start
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
npm run tests:ui          # Playwright UI mode
npm run typecheck         # TypeScript type check
npm run check             # Biome: lint + format
npm run check:ci          # Biome in CI mode
npm run format            # Biome: auto-format
```

## Conventions

The full project guidelines (`data-testid` locators, grouping locators in page objects,
TypeScript rules, Biome style, fixtures, CI) are described in the [CLAUDE.md](CLAUDE.md) file.
