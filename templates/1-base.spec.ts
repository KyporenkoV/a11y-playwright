import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

/*
Basic set up and general logic of accessibility testing.
---
Steps:
1. Move to a page and create state which need to be tested;
2. Scan the page using AxeBuilder;
3. Check the results of scanning using playwright assertation.
*/

test.describe('Base set up @a11y', () => {
  test('вase example', async ({ page }) => {
    await page.goto('https://playwright.dev');

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    expect(accessibilityScanResults.violations.length).toBe(0);
  });
});