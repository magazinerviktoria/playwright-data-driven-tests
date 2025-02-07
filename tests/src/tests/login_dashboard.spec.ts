import {expect, test} from '@playwright/test';
import {LoginPage} from "../pageobjects/LoginPage";
import {DashboardPage} from "../pageobjects/DashboardPage";
import loginData from "../test-data/loginData.json";
import testCasesData from "../test-data/testCasesData.json";

test.beforeEach(async ({page}) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    await loginPage.navigateTo();
    await loginPage.login(loginData.username, loginData.password);

    const header = await dashboardPage.getDashboardHeader();
    await expect(header).toBeVisible();
});

testCasesData.forEach((data) => {
    test(`Verify task "${data.taskCard}" with "${data.tags.join(',')}" is in the "${data.column}" column under "${data.projectName}" project`, async ({page}) => {
        const dashboardPage = new DashboardPage(page)

        await dashboardPage.selectProject(data.projectName);

        const column = await dashboardPage.getColumnByName(data.column);
        await expect(column).toBeVisible();

        const taskCard = await dashboardPage.getTaskCardInColumn(column, data.taskCard);
        await expect(taskCard).toBeVisible();

        for (const tag of data.tags) {
            const tagLocator = await dashboardPage.getTagInTaskCard(taskCard, tag);
            await tagLocator.waitFor({state: 'attached'});
            await expect(tagLocator).toBeVisible();
        }
    });
});
