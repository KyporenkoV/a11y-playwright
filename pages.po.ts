import { Page } from "@playwright/test";
import AxeBuilder from '@axe-core/playwright';
import { attachAxeReport } from './utils';


abstract class BasePage {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async accessibilityScan(testInfo, include?) {
        if (include) {
            await this.page.waitForSelector(include, { state: 'visible' });
        };

        const accessibilityScanResults = await new AxeBuilder({ page: this.page })
            .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
            .disableRules('image-alt')
            .include(include || 'body')
            .analyze();

        await attachAxeReport(testInfo, accessibilityScanResults);

        return accessibilityScanResults.violations.length;
    }
}






export class MainPage extends BasePage {
    header = this.page.locator('h1');

    async navigate() {
        await this.page.goto('https://playwright.dev');
    }
    
    async openSearch() {
        await this.page.locator('.DocSearch-Button-Placeholder').click();
    }
}