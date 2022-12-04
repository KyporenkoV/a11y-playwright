import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { attachAxeReport } from '../utils';

/*
Scan configuration
TAGS: https://github.com/dequelabs/axe-core/blob/master/doc/API.md#axe-core-tags
*/

test.describe('Scan configuration @a11y', () => {
    test('withTags', async ({ page }, testInfo) => {
        await page.goto('https://playwright.dev');

        await page.waitForLoadState()

        const accessibilityScanResults = await new AxeBuilder({ page })
            .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']) // work

            // .withTags('wcag2aa') // work

            .analyze();

        await attachAxeReport(testInfo, accessibilityScanResults);
        expect(accessibilityScanResults.violations.length).toBe(0);
    });

    test('disableRules', async ({ page }, testInfo) => {
        await page.goto('https://playwright.dev');

        const accessibilityScanResults = await new AxeBuilder({ page })
            //Works fine - will be disabled all rules from scaning
            .disableRules(['color-contrast', 'link-name', 'empty-heading', 'heading-order', 'image-alt'])

            // //Works only if need disable 1 rule. In case of chane will be disabled only the last rule in the chane.
            // .disableRules('color-contrast')
            // .disableRules('link-name')
            // .disableRules('empty-heading')
            // .disableRules('heading-order')
            // .disableRules('image-alt')

            .analyze();

        await attachAxeReport(testInfo, accessibilityScanResults);
        expect(accessibilityScanResults.violations.length).toBe(0);
    });

    test('withRules', async ({ page }, testInfo) => {
        await page.goto('https://playwright.dev');

        const accessibilityScanResults = await new AxeBuilder({ page })
            //Works fine - will be included all rules to scaning
            .withRules(['color-contrast', 'link-name', 'empty-heading', 'heading-order', 'image-alt'])

            // //Works only if need include 1 rule. In case of chane will be included only the last rule in the chane
            // .withRules('color-contrast')
            // .withRules('link-name')
            // .withRules('empty-heading')
            // .withRules('heading-order')
            // .withRules('image-alt')

            .analyze();

        await attachAxeReport(testInfo, accessibilityScanResults);
        expect(accessibilityScanResults.violations.length).toBe(0);
    });

    test('exclude', async ({ page }, testInfo) => {
        await page.goto('https://playwright.dev');

        const accessibilityScanResults = await new AxeBuilder({ page })
            .exclude('.navbar--fixed-top') // work
            .exclude('.features_keug') // work

            // .exclude(['.navbar--fixed-top']) // work

            // .exclude(['.navbar--fixed-top', '.features_keug']) //  are not currently supported

            .analyze();

        await attachAxeReport(testInfo, accessibilityScanResults);
        expect(accessibilityScanResults.violations.length).toBe(0);
    });

    test('include', async ({ page }, testInfo) => {
        await page.goto('https://playwright.dev');

        const accessibilityScanResults = await new AxeBuilder({ page })
            .include('.navbar--fixed-top') // work
            .include('.features_keug') // work

            // .include(['.navbar--fixed-top']) // work

            // .include(['.navbar--fixed-top', '.features_keug']) //  are not currently supported

            .analyze();


        await attachAxeReport(testInfo, accessibilityScanResults);
        expect(accessibilityScanResults.violations.length).toBe(0);
    });

    test('combination of several rules', async ({ page }, testInfo) => {
        await page.goto('https://playwright.dev');

        const accessibilityScanResults = await new AxeBuilder({ page })
            .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
            .disableRules('image-alt')
            .include('.main-wrapper')
            .analyze();

        await attachAxeReport(testInfo, accessibilityScanResults);
        expect(accessibilityScanResults.violations.length).toBe(0);
    });
});