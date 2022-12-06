import { test, expect } from '../fixtures';

/*
Another way how to optimize code by extending expect();
*/

test.only('Using extended expect', async ({ page }, testInfo) => {
    await page.goto('https://playwright.dev');
    await expect(page).toBeAccessible(testInfo);
});