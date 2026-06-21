Analyze the repository and switch the test login flow to API-based authentication.
Use the HAR file in the test-results folder as a reference for the login request.

- Create a loginViaApi fixture that logs in via API (sets up the authenticated
  session: tokens/cookies/storage state) instead of the current UI login fixture.
- Add a skipAutoLogin fixture flag that I'll pass in tests to disable the auto
  API login - needed for tests targeting the login form itself.

You can also use the Playwright MCP if needed (e.g. to inspect the login flow
in the browser or verify the authenticated session works).

Follow the project's existing conventions and don't break current tests.
If anything is unclear, ask me before implementing.