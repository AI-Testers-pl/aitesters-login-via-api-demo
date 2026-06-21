# CLAUDE.md

## Project overview

Playwright test automation project using TypeScript and Faker.js for mock data generation.
The project follows the Page Object Model (POM) pattern.

## Commands

```bash
npm run typecheck      # TypeScript type check (no emit)
npm run check          # Biome lint + format check
npm run format         # Biome auto-format
```

## Project structure

```
src/
  enums/       # TypeScript enums (e.g. ProductCategory)
  fixtures/    # Playwright fixtures
  helpers/     # Data generators and utilities
  pages/       # Page Object Model classes
  tests/       # Playwright test specs (.spec.ts)
  types/       # TypeScript type definitions
```

## Path aliases (tsconfig)

Always use path aliases for imports — never relative paths:

| Alias         | Maps to          |
|---------------|------------------|
| `@enums/*`    | `src/enums/*`    |
| `@fixtures/*` | `src/fixtures/*` |
| `@helpers/*`  | `src/helpers/*`  |
| `@pages/*`    | `src/pages/*`    |
| `@tests/*`    | `src/tests/*`    |
| `@typings/*`  | `src/types/*`    |

## TypeScript conventions

- Strict mode is fully enabled — no `any`, no type assertions unless unavoidable
- Use `import type` for type-only imports (`import type { Product } from '@typings/product'`)
- `verbatimModuleSyntax` is enabled — always distinguish value vs type imports
- Types go in `src/types/`, enums go in `src/enums/`

## Code style (enforced by Biome)

- Single quotes
- Semicolons always
- 2-space indentation
- Line width: 120 characters
- Trailing commas: ES5
- Arrow function parentheses: always

## Locator strategy

The app exposes `data-testid` attributes on all interactive and meaningful elements. Always prefer `getByTestId()` as the primary locator strategy in page objects. Only fall back to `getByRole()`, `getByLabel()`, or other semantic locators when no `data-testid` is present.

## Comments

Never add comments to code files — no inline comments, no block comments, no section labels. Names should be descriptive enough on their own.

## Page object locator grouping

Group locators of the same type into named nested objects on the page object class. Use the element type as the group name:

```ts
readonly inputs: {
  readonly username: Locator;
  readonly password: Locator;
};

readonly buttons: {
  readonly signIn: Locator;
  readonly forgotPassword: Locator;
};

readonly links: {
  readonly userProfile: Locator;
  readonly cart: Locator;
};
```

Standalone locators (e.g. text elements, containers, lists) that don't belong to a type group stay as top-level class properties. For repeating elements (e.g. product cards in a list), expose a method that returns scoped locators for a given item by index.

Never call `getByTestId()` (or any locator factory) inline inside a page object method. Every locator a method needs must already be declared in the locators section (a type group or a top-level property) and initialized in the constructor; methods only reference `this.<locator>`. A locator that lives on a different page (e.g. waiting for a dashboard element after login) still gets declared on the page object whose method uses it.

## Naming conventions

- Files: `camelCase.ts` (e.g. `productsGenerator.ts`, `productCategory.ts`)
- Types: PascalCase (`Product`, `ProductCategory`)
- Enums: PascalCase name, UPPER_SNAKE_CASE keys with string values
- Functions: camelCase (`generateProduct`, `generateProducts`)
- Test files: `*.spec.ts`

## Helpers

- `generateProduct(id: number): Product` — generates a single mock product using Faker.js
- `generateProducts(count = 8): Product[]` — generates an array of products with sequential IDs

## Fixtures

Tests import `test` and `expect` from `@fixtures/pages` — never from `@playwright/test` directly. The fixture file (`src/fixtures/pages.ts`) extends Playwright's base `test` and is the single entry point for specs.

It provides:
- **Page object fixtures** — `loginPage`, `dashboardPage`, `productsPage`. Each instantiates its page object once per test, so specs never write `new XxxPage(page)`.
- **`login`** — an auto fixture (`{ auto: true }`) that runs before every test: it calls `loginPage.goTo()` then `loginPage.login()` (which defaults to the demo credentials from `@helpers/users`). Tests do not destructure or reference it; authentication just happens. `login()` waits for the post-login dashboard element, so the session is established before the test body runs.

Because login is automatic, tests navigate straight to a page by URL via the page object's `goTo()` (e.g. `productsPage.goTo()`) rather than clicking through UI menus, and they won't be redirected to `/login`.

Add new page objects to the `Pages` type and `base.extend` in `src/fixtures/pages.ts` as fixtures rather than instantiating them in specs. Credentials live in `@helpers/users` (`demoClientUser`), not inline in tests.

## Environment variables

Defined in `config/.env.local` (copy from `config/.env.local.dist`):
- `BASE_URL` — app base URL
- `DEMO_USER_CLIENT_USERNAME`, `DEMO_USER_CLIENT_PASSWORD`, `DEMO_USER_CLIENT_DISPLAY_NAME` — demo client account credentials
- `DEMO_USER_ADMIN_USERNAME`, `DEMO_USER_ADMIN_PASSWORD`, `DEMO_USER_ADMIN_DISPLAY_NAME` — demo admin account credentials

## CI/CD

GitHub Actions pipeline (`.github/workflows/playwright.yml`) triggers on push/PR to `master`:
1. **quality-gate** — typecheck + biome check
2. **test** — installs Chromium, runs Playwright tests, uploads HTML report as artifact (depends on quality-gate)

Node version is read from `.nvmrc`. Only Chromium is installed in CI.

## Pre-commit hooks

Husky + lint-staged runs on commit:
- `*.ts` — `biome check --write`
- `*.json`, `*.md` — `biome format --write`
