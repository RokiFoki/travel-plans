import { AppPage } from './app.po';
import { browser, by } from 'protractor';

describe('register/login', () => {
  let page: AppPage;
  browser.ignoreSynchronization = true;
  browser.waitForAngularEnabled();

  const goToRegistrationPage = async () => {
    await page.navigateTo();
    await page.clickDontHaveAccount();
  };

  const goToLoginPage = async () => {
    await page.navigateTo();
  };

  const register = async (username: string, password: string) => {
    expect(await page.findElement('#register-button').isEnabled()).toBeFalsy();
    await page.populateUsername(username);
    expect(await page.findElement('#register-button').isEnabled()).toBeFalsy();
    await page.populatePassword(password);
    expect(await page.findElement('#register-button').isEnabled()).toBeTruthy();

    await page.findElement('#register-button').click();
  };

  const login = async (username: string, password: string) => {
    expect(await page.findElement('#login-button').isEnabled()).toBeFalsy();
    await page.populateUsername(username);
    expect(await page.findElement('#login-button').isEnabled()).toBeFalsy();
    await page.populatePassword(password);
    expect(await page.findElement('#login-button').isEnabled()).toBeTruthy();

    await page.findElement('#login-button').click();
  };

  beforeEach(async () => {
    page = new AppPage();
    await goToRegistrationPage();
  });

  it('should display Please register', async () => {
    console.log('should display Please register');
    expect(await page.getCardTitleText()).toEqual('Please register');
  });

  it('should allow you to register a new account', async () => {
    console.log('should allow you to register a new account');
    await register(`TEST_USER_${+new Date()}`, '123abc!@#');

    expect(browser.isElementPresent(by.tagName('app-dashboard'))).toBeTruthy();
  });

  it('should not allow you to register a new account with existing username', async () => {
    console.log('should not allow you to register a new account with existing username');
    const date = new Date();

    await register(`TEST_USER_${+date}`, '123abc!@#');
    await goToRegistrationPage();
    await register(`TEST_USER_${+date}`, '123abc!@#');

    expect(browser.isElementPresent(by.tagName('app-dashboard'))).toBeFalsy();
  });

  it('should allow you to login with existing account', async () => {
    console.log('should allow you to login with existing account');
    const date = new Date();

    await register(`TEST_USER_${+date}`, '123abc!@#');
    await goToLoginPage();
    await login(`TEST_USER_${+date}`, '123abc!@#');

    expect(browser.isElementPresent(by.tagName('app-dashboard'))).toBeTruthy();
  });
});
