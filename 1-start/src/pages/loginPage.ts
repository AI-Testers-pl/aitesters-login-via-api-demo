import { demoClientUser } from '@helpers/users';
import { BasePage } from '@pages/basePage';
import type { Locator, Page } from '@playwright/test';

export class LoginPage extends BasePage {
  readonly welcomeTitle: Locator;

  readonly inputs: {
    readonly username: Locator;
    readonly password: Locator;
  };

  readonly buttons: {
    readonly signIn: Locator;
    readonly forgotPassword: Locator;
    readonly register: Locator;
  };

  readonly errorToast: {
    readonly title: Locator;
    readonly description: Locator;
  };

  constructor(page: Page) {
    super(page, '/login');

    this.welcomeTitle = page.getByTestId('home-welcome-title');

    this.inputs = {
      username: page.getByTestId('login-username-input'),
      password: page.getByTestId('login-password-input'),
    };

    this.buttons = {
      signIn: page.getByTestId('login-submit-button'),
      forgotPassword: page.getByTestId('login-forgot-link'),
      register: page.getByTestId('login-register-link'),
    };

    this.errorToast = {
      title: page.getByTestId('toast-title'),
      description: page.getByTestId('toast-description'),
    };
  }

  async submit(username: string, password: string): Promise<void> {
    await this.inputs.username.fill(username);
    await this.inputs.password.fill(password);
    await this.buttons.signIn.click();
  }

  async login(username: string = demoClientUser.username, password: string = demoClientUser.password): Promise<void> {
    await this.submit(username, password);
    await this.welcomeTitle.waitFor();
  }
}
