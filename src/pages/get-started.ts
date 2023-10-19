import { expect } from '../../tests/fixtures/fixture';
import { PageOf } from './pages';
import * as TE from 'fp-ts/TaskEither';

export interface GetStarted {
    verifyIfHeadingInstallationElementIsVisible: () => TE.TaskEither<void, void>;
}

export const getStarted: PageOf<GetStarted> = (page) => {
    return {
        verifyIfHeadingInstallationElementIsVisible: () => 
            TE.tryCatch<void, void>(
                    async () => {
                        await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
                    },
                (error) => {
                    throw new Error(error as string);
                }
            )
    };
}