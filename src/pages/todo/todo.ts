import { base } from '../base';
import { PageOf } from './../pages';
import * as TE from 'fp-ts/TaskEither';
import * as selectors from '../../../selectors/selectors.json';
import { expect } from '../../../tests/fixtures/fixture';

export interface TodoPage {
    goto: (url?: string) => TE.TaskEither<void, void>;
    addTodoItem: (item: string) => TE.TaskEither<void, void>;
    verifyAddedItems: (itemsToContain: string[]) => TE.TaskEither<void, void>;
}

export const todoPage: PageOf<TodoPage> = (page) => {
    return {
        goto: (url) =>  base(page).goto(url),
        addTodoItem: (item): TE.TaskEither<void, void> => 
            TE.tryCatch(
                async () => {
                    const newTodo = page.getByPlaceholder(selectors.todoPage.newTodoItem);
                    await newTodo.fill(item);
                    await newTodo.press('Enter');
                },
                (error) => {
                throw new Error(error as string);
                }
            ),
        verifyAddedItems: (itemsToContain): TE.TaskEither<void, void> => 
        TE.tryCatch(
            async () => {
                await expect(page.getByTestId(selectors.todoPage.addedTodoItems)).toHaveText(itemsToContain);
            },
            (error) => {
            throw new Error(error as string);
            }
        ),
    };
}