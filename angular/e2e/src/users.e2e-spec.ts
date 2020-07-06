import { AppPage } from './app.po';
import { browser, by, element } from 'protractor';

describe('Users Page', () => {
  let page: AppPage;
  browser.ignoreSynchronization = true;
  browser.waitForAngularEnabled();

  beforeEach(async () => {
    page = new AppPage();
    await page.navigateTo();
  });

  describe('User Manager', () => {
    beforeEach(async () => {
      await page.loginAsUserManager();
      await page.sleep(1000);
      expect(browser.isElementPresent(by.id('users-button'))).toBeTruthy();
      await page.clickUsersButton();
    });

    it('Adding/editing/deleting a user', async () => {
      const d = new Date();

      const initialRowCount = await page.getTableRows();

      await element(by.id('add-new-user-button')).click();
      await element(by.name('username')).sendKeys(`TEST_USER_${+d}`);
      await element(by.name('password')).sendKeys('1');
      await element(by.name('role')).click();
      await element(by.css('.mat-option[ng-reflect-value="1"]')).click();
      await element(by.id('submit')).click();

      await page.sleep(1000);
      const afterAddCount = await page.getTableRows();
      expect(afterAddCount).toEqual(initialRowCount + 1);

      await element(by.name('filter')).sendKeys(`TEST_USER_${+d}`);
      await page.sleep(1000);

      const afterFilterCount1 = await page.getTableRows();
      const newD = new Date();

      expect(browser.isElementPresent(by.name('trips'))).toBeFalsy();
      await element(by.name('edit')).click();
      await element(by.name('username')).clear();
      await page.sleep(1000);
      await element(by.name('username')).sendKeys(`TEST_USER_${+newD}`);
      await element(by.id('submit')).click();

      await page.sleep(1000);
      const afterEditCount = await page.getTableRows();

      expect(afterEditCount).toEqual(afterFilterCount1 - 1);

      await element(by.name('filter')).clear();
      await element(by.name('filter')).sendKeys(`TEST_USER_${+newD}`);
      await page.sleep(1000);

      const afterFilterCount2 = await page.getTableRows();

      await element(by.name('delete')).click();
      await element(by.id('confirm')).click();

      await page.sleep(1000);
      const afterDeleteCount = await page.getTableRows();
      expect(afterDeleteCount).toEqual(afterFilterCount2 - 1);
    });
  });

  describe('Administrator', () => {
    beforeEach(async () => {
      await page.loginAsAdministrator();
      await page.sleep(1000);
      expect(browser.isElementPresent(by.id('users-button'))).toBeTruthy();
      await page.clickUsersButton();
    });

    it('Adding/editing/deleting a user', async () => {
      const d = new Date();

      const initialRowCount = await page.getTableRows();

      await element(by.id('add-new-user-button')).click();
      await element(by.name('username')).sendKeys(`TEST_USER_${+d}`);
      await element(by.name('password')).sendKeys('1');
      await element(by.name('role')).click();
      await element(by.css('.mat-option[ng-reflect-value="1"]')).click();
      await element(by.id('submit')).click();

      await page.sleep(1000);
      const afterAddCount = await page.getTableRows();
      expect(afterAddCount).toEqual(initialRowCount + 1);

      await element(by.name('filter')).sendKeys(`TEST_USER_${+d}`);
      await page.sleep(1000);

      const afterFilterCount1 = await page.getTableRows();
      const newD = new Date();

      await element(by.name('edit')).click();
      await element(by.name('username')).clear();
      await page.sleep(1000);
      await element(by.name('username')).sendKeys(`TEST_USER_${+newD}`);
      await element(by.id('submit')).click();

      await page.sleep(1000);
      const afterEditCount = await page.getTableRows();

      expect(afterEditCount).toEqual(afterFilterCount1 - 1);

      await element(by.name('filter')).clear();
      await element(by.name('filter')).sendKeys(`TEST_USER_${+newD}`);
      await page.sleep(1000);

      const afterFilterCount2 = await page.getTableRows();

      await element(by.name('delete')).click();
      await element(by.id('confirm')).click();

      await page.sleep(1000);
      const afterDeleteCount = await page.getTableRows();
      expect(afterDeleteCount).toEqual(afterFilterCount2 - 1);
    });

    it('Can check user trips', async () => {
      const d = new Date();
      await page.createUser(`TEST_USER_${+d}`, '1');

      await page.filter(`TEST_USER_${+d}`);
      expect(browser.isElementPresent(by.name('trips'))).toBeTruthy();
      await element(by.name('trips')).click();

      await page.sleep(1000);
      expect(browser.isElementPresent(by.tagName('app-trips'))).toBeTruthy();
    });
  });
});
