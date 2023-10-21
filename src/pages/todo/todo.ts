import { base } from '@pages/base';
import { PageOf } from '@pages/pages';
import * as TE from 'fp-ts/TaskEither';
import * as selectors from '@selectors';
import { expect } from '@fixture';
import { Locator } from '@playwright/test';

export interface TodoPage {
    goto: (url?: string) => TE.TaskEither<void, void>;
    addTodoItem: (item: string) => TE.TaskEither<void, void>;
    addTodoItems: (items: string[]) => TE.TaskEither<void, void>;
    markAllAsComplete: () => TE.TaskEither<void, void>;
    markAllAsIncomplete: () => TE.TaskEither<void, void>;
    verifyAddedItems: (itemsToContain: string[]) => TE.TaskEither<void, void>;
    verifyCompletedItems: (completedItems: number) => TE.TaskEither<void, void>;
    verifyNewTodoItemToBeEmpty: () => TE.TaskEither<void, void>;
    verifyIncompleteTodoItemsCount: (count: string) => TE.TaskEither<void, void>;
}

export const todoPage: PageOf<TodoPage> = (page) => {
    const newTodo: Locator = page.getByPlaceholder(selectors.todoPage.newTodoItem);
    const toggleItem: Locator = page.getByLabel(selectors.todoPage.markAllAsComplete);
    
    return {
        goto: (url) =>  base(page).goto(url),
        addTodoItem: (item): TE.TaskEither<void, void> => 
            TE.tryCatch(
                async () => {
                    await newTodo.fill(item);
                    await newTodo.press('Enter');
                },
                (error) => {
                    throw new Error(error as string);
                }
            ),
        addTodoItems: (items): TE.TaskEither<void, void> => 
            TE.tryCatch(
                async () => {
                    for (const item of items) {
                        await todoPage(page).addTodoItem(item)();
                    }
                },
                (error) => {
                    throw new Error(error as string);
                }
            ),
        markAllAsComplete: (): TE.TaskEither<void, void> => 
            TE.tryCatch(
                async () => toggleItem.check(),
                (error) => {
                    throw new Error(error as string);
                }
            ),
        markAllAsIncomplete: (): TE.TaskEither<void, void> => 
            TE.tryCatch(
                async () => toggleItem.uncheck(),
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
        verifyCompletedItems: (completedItems): TE.TaskEither<void, void> => 
            TE.tryCatch(
                async () => {
                    const completedItemsArr = Array(completedItems).fill('completed');
                    await expect(page.getByTestId(selectors.todoPage.todoItem)).toHaveClass(completedItemsArr);
                },
                (error) => {
                    throw new Error(error as string);
                }
            ),
        verifyNewTodoItemToBeEmpty: (): TE.TaskEither<void, void> => 
            TE.tryCatch(
                async () => {
                    await expect(newTodo).toBeEmpty();
                },
                (error) => {
                    throw new Error(error as string);
                }
            ),
        verifyIncompleteTodoItemsCount: (count): TE.TaskEither<void, void> => 
            TE.tryCatch(
                async () => {
                    const todoCount = page.getByTestId(selectors.todoPage.todoCount);
                    await expect(todoCount).toHaveText(`${count} items left`);
                },
                (error) => {
                    throw new Error(error as string);
                }
            ),
    };
}