import { AppPage } from './app.po';
import { browser, by, element, protractor } from 'protractor';

describe('Trips Page', () => {
  let page: AppPage;
  browser.ignoreSynchronization = true;
  browser.waitForAngularEnabled();

  beforeEach(async () => {
    page = new AppPage();
    await page.navigateTo();
    await page.loginAsRegular();
    await page.sleep(1000);
  });

  it('Adding/editing/deleting a trip', async () => {
    const d = new Date();

    const initialRowCount = await page.getTableRows();

    await element(by.id('add-new-trip-button')).click();

    await element(by.name('destination')).sendKeys('London');
    await page.sleep(1000);
    await browser.actions().sendKeys(protractor.Key.ARROW_DOWN).perform();
    await browser.actions().sendKeys(protractor.Key.ENTER).perform();
    await element(by.name('startDate')).sendKeys('7/23/2020');
    await element(by.name('endDate')).sendKeys('7/24/2020');
    await element(by.name('comment')).sendKeys(`TEST_${+d}`);
    await element(by.id('submit')).click();
    await page.sleep(1000);

    const afterAddCount = await page.getTableRows();
    expect(afterAddCount).toEqual(initialRowCount + 1);



    await element(by.name('filter')).sendKeys(`TEST_${+d}`);
    await page.sleep(1000);

    const afterFilterCount1 = await page.getTableRows();
    const newD = new Date();

    await element(by.name('edit')).click();
    await element(by.name('comment')).clear();
    await page.sleep(1000);
    await element(by.name('comment')).sendKeys(`TEST_${+newD}`);
    await element(by.id('submit')).click();

    await page.sleep(1000);
    const afterEditCount = await page.getTableRows();

    expect(afterEditCount).toEqual(afterFilterCount1 - 1);

    await element(by.name('filter')).clear();
    await element(by.name('filter')).sendKeys(`TEST_${+newD}`);
    await page.sleep(1000);

    const afterFilterCount2 = await page.getTableRows();

    await element(by.name('delete')).click();
    await element(by.id('confirm')).click();

    await page.sleep(1000);
    const afterDeleteCount = await page.getTableRows();
    expect(afterDeleteCount).toEqual(afterFilterCount2 - 1);
  });
});
