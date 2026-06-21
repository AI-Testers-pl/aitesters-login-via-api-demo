import { signInViaApi } from '@helpers/authApi';
import { DashboardPage } from '@pages/dashboardPage';
import { LoginPage } from '@pages/loginPage';
import { ProductsPage } from '@pages/productsPage';
import { test as base } from '@playwright/test';
import type { AuthSession } from '@typings/authSession';

type Pages = {
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
  productsPage: ProductsPage;
  skipAutoLogin: boolean;
  loginViaApi: AuthSession | null;
};

export const test = base.extend<Pages>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  dashboardPage: async ({ page }, use) => {
    await use(new DashboardPage(page));
  },
  productsPage: async ({ page }, use) => {
    await use(new ProductsPage(page));
  },
  skipAutoLogin: [false, { option: true }],
  loginViaApi: [
    async ({ page, request, skipAutoLogin, dashboardPage }, use) => {
      if (skipAutoLogin) {
        await use(null);
        return;
      }

      const session = await signInViaApi(request);

      await page.context().addInitScript(
        ({ token, refreshToken }) => {
          window.localStorage.setItem('token', token);
          window.localStorage.setItem('refreshToken', refreshToken);
        },
        { token: session.token, refreshToken: session.refreshToken }
      );

      await page.goto('/');
      await dashboardPage.welcomeTitle.waitFor();

      await use(session);
    },
    { auto: true },
  ],
});

export { expect } from '@playwright/test';
