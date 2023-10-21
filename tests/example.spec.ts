import { test } from '@fixture';
import * as testData from '@testData/example.spec.json';
import runTestSteps from '@stepRunner';

test('has title fp', async ({ landingPage }) => runTestSteps([
    () => landingPage.verifyTitle(new RegExp(testData.hasTitle.pageTitle))
  ])
)

test('get started link fp', async ({ landingPage }) => runTestSteps([
    () => landingPage.clickGetStarted(),
    () => landingPage.getStarted.verifyIfHeadingInstallationElementIsVisible()
  ])
);
