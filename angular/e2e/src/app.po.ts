import { browser, by, element, protractor } from 'protractor';

export class AppPage {
  navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl) as Promise<unknown>;
  }

  async login(username: string, password: string) {
    await this.populateUsername(username);
    await this.populatePassword(password);

    await this.findElement('#login-button').click();
  }

  async loginAsUserManager() {
    await this.login('User Manager', '1');
  }

  async loginAsRegular() {
    await this.login('Regular', '1');
  }

  async loginAsAdministrator() {
    await this.login('Administrator', '1');
  }

  clickDontHaveAccount() {
    return element(by.css('#register-link')).click();
  }

  getCardTitleText(): Promise<string> {
    return element(by.css('app-root .mat-card-title')).getText() as Promise<string>;
  }

  populateUsername(username: string) {
    return element(by.css('input[name="username"]')).sendKeys(username);
  }

  populatePassword(password: string) {
    return element(by.css('input[name="password"]')).sendKeys(password);
  }

  findElement(cssSelector: string) {
    return element(by.css(cssSelector));
  }

  clickUsersButton() {
    return element(by.id('users-button')).click();
  }

  getTableRows() {
    return element(by.className('mat-paginator-range-label')).getText()
      .then(text => parseInt(text.split(' of ')[1].trim(), 10));
  }

  async createUser(username: string, password: string, role: number = 1) {
    const d = new Date();

    await element(by.id('add-new-user-button')).click();
    await element(by.name('username')).sendKeys(username);
    await element(by.name('password')).sendKeys(password);
    await element(by.name('role')).click();
    await element(by.css(`.mat-option[ng-reflect-value="${role}"]`)).click();
    await element(by.id('submit')).click();

    await this.sleep(1000);
  }

  async addTrip(destination: string, startDate: string, endDate: string, comment: string) {
    await element(by.id('add-new-trip-button')).click();

    await element(by.name('destination')).sendKeys(destination);
    await this.sleep(1000);
    await browser.actions().sendKeys(protractor.Key.ARROW_DOWN).perform();
    await browser.actions().sendKeys(protractor.Key.ENTER).perform();
    await element(by.name('startDate')).sendKeys(startDate);
    await element(by.name('endDate')).sendKeys(endDate);
    await element(by.name('comment')).sendKeys(comment);
    await element(by.id('submit')).click();
    await this.sleep(1000);
  }

  async filter(value: string) {
    await element(by.name('filter')).clear();
    await element(by.name('filter')).sendKeys(value);
    await this.sleep(1000);
  }

  sleep(miliseconds = 60000) {
    return browser.sleep(miliseconds);
  }

  toString() {
    return browser.getPageSource();
  }
}
