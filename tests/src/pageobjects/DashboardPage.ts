import {Page, Locator} from "@playwright/test";

export class DashboardPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    private selectors = {
        column: '.flex-1.flex.flex-col',
        taskCard: 'div.bg-white.p-4.rounded-lg.shadow-sm.border'
    }

    async getDashboardHeader(): Promise<Locator> {
        return this.page.locator('header >> text="Main web application development"');
    }

    async selectProject(projectName: string): Promise<void> {
        await this.page.getByRole('button', {name: projectName}).click();
    }

    async getColumnByName(columnName: string): Promise<Locator> {
        return this.page.locator(this.selectors.column).filter({hasText: columnName});
    }

    async getTaskCardInColumn(column: Locator, taskCardName: string): Promise<Locator> {
        return column.locator(this.selectors.taskCard).filter({hasText: taskCardName});
    }

    async getTagInTaskCard(taskCard: Locator, tag: string): Promise<Locator> {
        return taskCard.locator(`span:has-text("${tag}")`);
    }
}