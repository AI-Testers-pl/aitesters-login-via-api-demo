# AI Testers – Login via API demo

Materials from the webinar held on **18.06.2026**.

This repository contains a **Playwright + TypeScript** test automation project, on which during the webinar we switch from logging in through the UI to logging in via the **API**.

## Repository structure

The materials are split into two folders matching the stages of our work:

| Folder       | Description                                                                          |
|--------------|--------------------------------------------------------------------------------------|
| `1-start/`   | **Starting point** - project state at the beginning of the webinar (UI login).       |
| `2-finish/`  | **Finished work** - final result after switching to API login + **bonus**.           |

### `./1-start` - starting point

The project in its initial state, where we begin the webinar. Login happens through the UI
form. The file [`1-start/PROMPT.md`](1-start/PROMPT.md) contains the prompt we start the work
from.

### `./2-finish` - final result + bonus

The project after the webinar - login has been switched to API-based authentication (the `loginViaApi` fixture, and a `skipAutoLogin` flag for tests targeting the login form
itself).

### 🎁 **Bonus:** a **Claude Code** skill named `login-via-api`

The skill documents the API login flow (the `signin` endpoint, how the session is stored in `localStorage`, seeding the tokens) and ships a
[`scripts/signin.sh`](2-finish/.claude/skills/login-via-api/scripts/signin.sh) script for fetching a JWT. Thanks to it, Claude Code knows how to authenticate a session in this project - both in Playwright tests and in a browser driven through Playwright MCP.

## Getting started

```bash
git clone https://github.com/AI-Testers-pl/aitesters-login-via-api-demo
cd aitesters-login-via-api-demo
```

Enter the folder of your choice (`1-start` or `2-finish`) and install the dependencies:

```bash
cd 1-start
npm install
```

```bash
cd 2-finish
npm install
```

For detailed instructions, see the `README.md` files inside each folder and their `CLAUDE.md` files.
