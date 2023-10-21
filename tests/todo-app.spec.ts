import { test } from '@fixture';
import * as testData from '@testData/toto-app.spec.json';
import runTestSteps from '@stepRunner';

test.describe("New todo", () => {
    test('should allow me to add todo items', async ({ todoPage }) => runTestSteps([
            () => todoPage.addTodoItem(testData.todoItems[0]),
            () => todoPage.verifyAddedItems([testData.todoItems[0]]),
            () => todoPage.addTodoItem(testData.todoItems[1]),
            () => todoPage.verifyAddedItems([testData.todoItems[0], testData.todoItems[1]]),
            () => todoPage.addTodoItem(testData.todoItems[2]),
            () => todoPage.verifyAddedItems(testData.todoItems),
        ])
    );

    test('should clear text input field when an item is added', async ({ todoPage }) => runTestSteps([
            () => todoPage.addTodoItem(testData.todoItems[0]),
            () => todoPage.verifyNewTodoItemToBeEmpty(),
            () => todoPage.verifyAddedItems([testData.todoItems[0]]),
        ])
    );

    test('should append new items to the bottom of the list', async ({ todoPage }) => runTestSteps([
            () => todoPage.addTodoItems(testData.todoItems),
            () => todoPage.verifyIncompleteTodoItemsCount(testData.todoItems.length.toString()),
        ])
    );
});

test.describe('Mark all as completed', () => {
    test.beforeEach(async ({ todoPage }) => runTestSteps([
            () => todoPage.addTodoItems(testData.todoItems),
        ])
    ); 

    test('should allow me to mark all items as completed', async ({ todoPage }) => runTestSteps([
            () => todoPage.markAllAsComplete(),
            () => todoPage.verifyCompletedItems(testData.todoItems.length),
        ])
    );

    test('should allow me to clear the complete state of all items', async ({ todoPage }) => runTestSteps([
            () => todoPage.markAllAsComplete(),
            () => todoPage.markAllAsIncomplete(),
            () => todoPage.verifyIncompleteTodoItemsCount(testData.todoItems.length.toString()),
        ])
    );
});