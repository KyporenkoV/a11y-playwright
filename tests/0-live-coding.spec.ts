import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Accessibility testing', () => {
  test('Live coding', async ({ page }) => {

    await page.goto('https://playwright.dev');

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
    
  });
});