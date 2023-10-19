import { test } from './fixtures/fixture';
import * as TE from 'fp-ts/TaskEither';
import * as F from 'fp-ts/function';

test('has title fp', async ({ landingPage }) => {
  await F.pipe(
    landingPage.goto('https://playwright.dev/'),
    TE.chain(() => landingPage.verifyTitle(/Playwright/))
  )();
});

test('get started link fp', async ({ landingPage }) => {
  await F.pipe(
    landingPage.goto('https://playwright.dev/'),
    TE.chain(() => landingPage.clickGetStarted()),
    TE.chain(() => landingPage.getStarted.verifyIfHeadingInstallationElementIsVisible())
  )();
});
