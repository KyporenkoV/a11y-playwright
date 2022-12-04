import { test, expect } from '../fixtures';
import { MainPage } from '../pages.po';

/*
Additional set of tests for showing how accessibility tests can be used.
*/

test.describe('Ways of using accessibility tests @a11y', () => {
    test('One scan for whole page', async ({ page }, testInfo) => {
        const mainPage = new MainPage(page);
        await mainPage.navigate();
        expect(await mainPage.accessibilityScan(testInfo)).toBe(0);
    });


    test('Using steps for scaning several parts of the page @a11y', async ({ page }, testInfo) => {
        const mainPage = new MainPage(page);
        await mainPage.navigate();

        await test.step('whole page', async () => {
            expect.soft(await mainPage.accessibilityScan(testInfo)).toBe(0);
        });

        await test.step('search modal', async () => {
            await mainPage.openSearch();
            expect.soft(await mainPage.accessibilityScan(testInfo, '.DocSearch-Modal')).toBe(0);
        });
    });


    test('Mixing general assertations and accessibility scanning', async ({ page }, testInfo) => {
        const mainPage = new MainPage(page);
        await mainPage.navigate();
        expect.soft(await mainPage.accessibilityScan(testInfo)).toBe(0);
        await expect(mainPage.header).toContainText('not-existing-text');
    });
});