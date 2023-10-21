import { expect } from '@fixture';
import { PageOf } from '@pages/pages';
import * as TE from 'fp-ts/TaskEither';
import * as selectors from '@selectors';

export interface GetStarted {
    verifyIfHeadingInstallationElementIsVisible: () => TE.TaskEither<void, void>;
}

export const getStarted: PageOf<GetStarted> = (page) => {
    return {
        verifyIfHeadingInstallationElementIsVisible: () => 
            TE.tryCatch<void, void>(
                    async () => {
                        await expect(page.getByRole('heading', { name: selectors.getStartedPage.installation })).toBeVisible();
                    },
                (error) => {
                    throw new Error(error as string);
                }
            )
    };
}