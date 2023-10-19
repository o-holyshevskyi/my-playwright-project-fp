import { test } from './fixtures/fixture';
import * as TE from 'fp-ts/TaskEither';
import * as F from 'fp-ts/function';
import * as testData from '../test-data/example.spec.json';

test('has title fp', async ({ landingPage }) => {
  await F.pipe(
    landingPage.verifyTitle(new RegExp(testData.hasTitle.pageTitle))
  )();
});

test('get started link fp', async ({ landingPage }) => {
  await F.pipe(
    landingPage.clickGetStarted(),
    TE.chain(() => landingPage.getStarted.verifyIfHeadingInstallationElementIsVisible())
  )();
});
