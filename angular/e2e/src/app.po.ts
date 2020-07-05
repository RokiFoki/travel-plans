import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl) as Promise<unknown>;
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

  sleep(miliseconds = 60000) {
    return browser.sleep(miliseconds);
  }

  toString() {
    return browser.getPageSource();
  }
}
