import { DashboardPage } from '@pages/dashboardPage';
import { LoginPage } from '@pages/loginPage';
import { ProductsPage } from '@pages/productsPage';
import { test as base } from '@playwright/test';

type Pages = {
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
  productsPage: ProductsPage;
  skipAutoLogin: boolean;
  loginViaUi: boolean;
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
  loginViaUi: [
    async ({ loginPage, skipAutoLogin }, use) => {
      if (!skipAutoLogin) {
        await loginPage.goTo();
        await loginPage.login();
      }
      await use(!skipAutoLogin);
    },
    { auto: true },
  ],
});

export { expect } from '@playwright/test';
