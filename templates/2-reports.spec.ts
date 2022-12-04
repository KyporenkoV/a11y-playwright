import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { attachAxeReport } from '../utils';

/*
Attaching scan results.
---
Scan results can be attached by using testInfo.

Accessibility Scaning Results include positive and negative results
that is why better way is using "accessibilityScanResults.violations" to save into report 
only information about failed checks.
*/

test.describe('Reports @a11y', () => {
    test('options 1', async ({ page }, testInfo) => {
        await page.goto('https://playwright.dev');

        const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

        await testInfo.attach('accessibility-scan-results', {
            body: JSON.stringify(accessibilityScanResults.violations, null, 2),
            contentType: 'application/json',
        });

        expect(accessibilityScanResults.violations.length).toBe(0);
    });


    test('option 2', async ({ page }, testInfo) => {
        await page.goto('https://playwright.dev');

        const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

        await attachAxeReport(testInfo, accessibilityScanResults);
        expect(accessibilityScanResults.violations.length).toBe(0);
    });
});