import { browser, by, element } from 'protractor';

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

  sleep(miliseconds = 60000) {
    return browser.sleep(miliseconds);
  }

  toString() {
    return browser.getPageSource();
  }
}
