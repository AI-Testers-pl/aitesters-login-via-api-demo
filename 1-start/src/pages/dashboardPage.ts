import { BasePage } from '@pages/basePage';
import type { Locator, Page } from '@playwright/test';

export class DashboardPage extends BasePage {
  readonly welcomeTitle: Locator;
  readonly userEmail: Locator;

  readonly buttons: {
    readonly products: Locator;
    readonly users: Locator;
    readonly profileOrders: Locator;
    readonly openAiAssistant: Locator;
    readonly openTrafficMonitor: Locator;
    readonly generateQrCodes: Locator;
    readonly sendEmails: Locator;
    readonly logout: Locator;
  };

  readonly links: {
    readonly userProfile: Locator;
    readonly cart: Locator;
    readonly navProducts: Locator;
    readonly navSendEmail: Locator;
    readonly navQrCode: Locator;
    readonly navLlm: Locator;
    readonly navTrafficMonitor: Locator;
    readonly navAdmin: Locator;
  };

  constructor(page: Page) {
    super(page, '/');
    this.welcomeTitle = page.getByTestId('home-welcome-title');
    this.userEmail = page.getByTestId('home-user-email');

    this.buttons = {
      products: page.getByTestId('home-products-button'),
      users: page.getByTestId('home-users-button'),
      profileOrders: page.getByTestId('home-profile-button'),
      openAiAssistant: page.getByTestId('home-llm-button'),
      openTrafficMonitor: page.getByTestId('home-traffic-button'),
      generateQrCodes: page.getByTestId('home-qr-button'),
      sendEmails: page.getByTestId('home-email-button'),
      logout: page.getByTestId('logout-button'),
    };

    this.links = {
      userProfile: page.getByTestId('username-profile-link'),
      cart: page.getByTestId('desktop-cart-icon'),
      navProducts: page.getByTestId('desktop-menu-products'),
      navSendEmail: page.getByTestId('desktop-menu-send-email'),
      navQrCode: page.getByTestId('desktop-menu-qr-code'),
      navLlm: page.getByTestId('desktop-menu-llm'),
      navTrafficMonitor: page.getByTestId('desktop-menu-traffic-monitor'),
      navAdmin: page.getByTestId('desktop-menu-admin'),
    };
  }

  async logout(): Promise<void> {
    await this.buttons.logout.click();
  }
}
