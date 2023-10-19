import { test as base } from '@playwright/test';
import { LandingPage, landingPage } from '../../src/pages/landing-page';
import * as F from 'fp-ts/function';

type Fixture = {
    landingPage: LandingPage;
};

export const test = base.extend<Fixture>({
    landingPage: async ({ page }, use) => {
        const landing = landingPage(page);
        await F.pipe(
            landing.goto(),
        )();
        await use(landing);
        await page.close();
    }
});

export { expect } from '@playwright/test';