import { test, expect } from '../fixtures';
import { MainPage } from '../pages.po';

/*
Using Page Objects
*/

test('Using Page Objects @a11y', async ({ page }, testInfo) => {
    const mainPage = new MainPage(page);
    await mainPage.navigate();
    expect(await mainPage.accessibilityScan(testInfo, '.main-wrapper')).toBe(0);
});