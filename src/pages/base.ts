import { PageOf } from '@pages/pages';
import * as TE from 'fp-ts/TaskEither';

export interface Base {
    goto: (url?: string) => TE.TaskEither<void, void>;
}

export const base: PageOf<Base> = (page) => {
    return {
        goto: (url): TE.TaskEither<void, void> => 
        TE.tryCatch(
            async () => { 
                if (url) {
                    await page.goto(url);
                } else {
                    await page.goto('/');
                }
            },
            (error) => { throw new Error(error as string) }
        ),
    };
}