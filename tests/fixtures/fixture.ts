import { test as base } from '@playwright/test';
import { LandingPage, landingPage } from '../../src/pages/example/landing-page';
import * as F from 'fp-ts/function';
import * as testData from '../../test-data/toto-app.spec.json';
import { TodoPage, todoPage } from '../../src/pages/todo/todo';

type Fixture = {
    landingPage: LandingPage;
    todoPage: TodoPage;
};

export const test = base.extend<Fixture>({
    landingPage: async ({ page }, use) => {
        const landing = landingPage(page);
        await F.pipe(
            landing.goto(),
        )();
        await use(landing);
        await page.close();
    },
    todoPage: async ({ page }, use) => {
        const todo = todoPage(page);
        await F.pipe(
            todo.goto(testData.url),
        )();
        await use(todo);
        await page.close();
    }
});

export { expect } from '@playwright/test';