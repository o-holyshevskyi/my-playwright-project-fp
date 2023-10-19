import { Page } from '@playwright/test';

export type PageOf<T> = (page: Page) => T;