import { getStarted, GetStarted } from './get-started';
import { expect } from '../../tests/fixtures/fixture';
import { PageOf } from './pages';
import * as TE from 'fp-ts/TaskEither';

export interface LandingPage {
    goto: (url: string) => TE.TaskEither<void, void>;
    clickGetStarted: () => TE.TaskEither<void, void>;
    verifyTitle: (title: RegExp | string) => TE.TaskEither<void, void>;
    getStarted: GetStarted;
}

export const landingPage: PageOf<LandingPage> = (page) => {
    return {
        goto: (url): TE.TaskEither<void, void> => 
            TE.tryCatch(
                async () => { await page.goto(url) },
                (error) => { throw new Error(error as string) }
            ),
        clickGetStarted: (): TE.TaskEither<void, void> => 
            TE.tryCatch(
                async () => page.getByRole('link', { name: 'Get started' }).click(),
                (error) => {
                throw new Error(error as string);
                }
            ),
        verifyTitle: (title): TE.TaskEither<void, void> => 
        TE.tryCatch(
            async () => await expect(page).toHaveTitle(title),
            (error) => {
              throw new Error(error as string);
            }
          ),
        getStarted: getStarted(page),
    };
}
