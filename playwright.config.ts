import { devices, PlaywrightTestConfig, TestInfo, Page, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

expect.extend({
  async toBeAccessible(page: Page, testInfo: TestInfo) {
    const scanResults = await new AxeBuilder({ page }).analyze();
    const numberOfViolatedRules = scanResults.violations.length;

    if (numberOfViolatedRules == 0) {
      return {
        message: () => 'pass',
        pass: true,
      };
    } else {
      await testInfo.attach('accessibility-scan-results', {
        body: JSON.stringify(scanResults.violations, null, 2),
        contentType: 'application/json',
      });
      return {
        message: () => `${numberOfViolatedRules} violated rules were found`,
        pass: false,
      };
    }
  },
});

const config: PlaywrightTestConfig = {
  testDir: './tests',
  timeout: 30 * 1000,
  expect: {
    timeout: 5000
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    screenshot: 'on',
    actionTimeout: 0,
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
  ],
};

export default config;
