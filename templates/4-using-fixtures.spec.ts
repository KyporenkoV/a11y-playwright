import { test, expect } from '../fixtures';
import { attachAxeReport } from '../utils';

/*
Using fixtures
*/

test('Using fixtures @a11y', async ({ page, makeAxeBuilder }, testInfo) => {
    await page.goto('https://playwright.dev');

    const accessibilityScanResults = await makeAxeBuilder()
        .disableRules('color-contrast')
        .analyze();

    await attachAxeReport(testInfo, accessibilityScanResults);
    expect(accessibilityScanResults.violations.length).toBe(0);
});