import { TestInfo } from '@playwright/test';
export { };

declare global {
    namespace PlaywrightTest {
        interface Matchers<R, T> {
            toBeAccessible(testInfor: TestInfo): R;
        }
    }
}