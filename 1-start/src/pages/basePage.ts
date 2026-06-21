import type { Page } from '@playwright/test';

export abstract class BasePage {
  readonly page: Page;

  constructor(
    page: Page,
    private readonly path: string
  ) {
    this.page = page;
  }

  async goTo(): Promise<void> {
    await this.page.goto(this.path);
  }
}
