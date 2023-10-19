import { test } from './fixtures/fixture';
import * as testData from '../test-data/toto-app.spec.json';
import * as F from 'fp-ts/function';
import * as TE from 'fp-ts/TaskEither';

test.describe("New todo", () => {
    test('should allow me to add todo items', async ({ todoPage }) => {
        await F.pipe(
            todoPage.addTodoItem(testData.todoItems[0]),
            TE.chain(() => todoPage.verifyAddedItems([testData.todoItems[0]])),
            TE.chain(() => todoPage.addTodoItem(testData.todoItems[1])),
            TE.chain(() => todoPage.verifyAddedItems([testData.todoItems[0], testData.todoItems[1]])),
            TE.chain(() => todoPage.addTodoItem(testData.todoItems[2])),
            TE.chain(() => todoPage.verifyAddedItems(testData.todoItems)),
        )();
    });
});