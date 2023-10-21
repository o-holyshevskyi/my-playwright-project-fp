import { base } from '@pages/base';
import { getStarted, GetStarted } from './get-started';
import { expect } from '@fixture';
import { PageOf } from '@pages/pages';
import * as TE from 'fp-ts/TaskEither';
import * as selectors from '@selectors';

export interface LandingPage {
    goto: (url?: string) => TE.TaskEither<void, void>;
    clickGetStarted: () => TE.TaskEither<void, void>;
    verifyTitle: (title: RegExp | string) => TE.TaskEither<void, void>;
    getStarted: GetStarted;
}

export const landingPage: PageOf<LandingPage> = (page) => {
    return {
        goto: (url) => base(page).goto(url),
        clickGetStarted: (): TE.TaskEither<void, void> => 
            TE.tryCatch(
                async () => page.getByRole('link', { name: selectors.landingPage.getStarted }).click(),
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
