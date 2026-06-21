import { defineConfig, devices } from '@playwright/test';
import { config } from 'dotenv';

config({ path: './config/.env.local', quiet: true });

export default defineConfig({
  testDir: './src/tests',
  outputDir: './test-results',
  fullyParallel: true,
  retries: 0,
  workers: 1,
  reporter: 'html',
  tsconfig: './tsconfig.json',
  use: {
    baseURL: process.env.BASE_URL,
    ...devices['Desktop Chrome'],
    channel: 'chrome',
    viewport: { width: 1920, height: 1080 },
    timezoneId: 'Europe/Warsaw',
    trace: 'on',
    screenshot: 'on',
    contextOptions: {
      recordHar: { path: './har-files/network.har' },
    },
    userAgent: 'QA-PLAYWRIGHT-TESTS',
  },
});
