import {Page, Locator} from "@playwright/test";
import loginData from "../test-data/loginData.json";

export class LoginPage{
    private page: Page;
    private username: Locator;
    private password: Locator;
    private loginButton: Locator;

    constructor(page: any) {
        this.page = page
        this.username = page.getByLabel('Username')
        this.password = page.getByLabel('Password')
        this.loginButton = page.getByRole('button', { type: 'submit' })

    }

    async navigateTo(): Promise<void> {
        await this.page.goto('https://animated-gingersnap-8cf7f2.netlify.app/');
    }

    async login(): Promise<void> {
        await this.username.fill(loginData.username);
        await this.password.fill(loginData.password);
        await this.loginButton.click();
    }
}