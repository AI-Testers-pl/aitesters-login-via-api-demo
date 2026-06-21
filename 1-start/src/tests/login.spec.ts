import { expect, test } from '@fixtures/pages';
import { demoClientUser } from '@helpers/users';

test.describe('Login form tests', () => {
  test.use({ skipAutoLogin: true });

  test('signs in with valid credentials and lands on the dashboard', async ({ loginPage, dashboardPage }) => {
    await loginPage.goTo();
    await loginPage.login();

    await expect(dashboardPage.welcomeTitle).toBeVisible();
    await expect(dashboardPage.userEmail).toBeVisible();
  });

  test('rejects an invalid password with a validation error', async ({ loginPage }) => {
    await loginPage.goTo();
    await loginPage.submit(demoClientUser.username, 'wrong-password');

    await expect(loginPage.errorToast.title).toHaveText('Error');
    await expect(loginPage.errorToast.description).toHaveText('Invalid username/password');
    await expect(loginPage.welcomeTitle).toBeHidden();
  });
});
