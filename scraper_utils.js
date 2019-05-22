const { PendingXHR } = require('pending-xhr-puppeteer');
const cssSelectors = require('./css_selectors');

async function getTextByCssSelector(page, selector) {
    const element = await page.$(selector);
    return await (await element.getProperty('textContent')).jsonValue();
}

async function clickButton(page, selector) {
    await page
        .waitForSelector(selector);
    
    await page
        .evaluate((cssSelector) => {document.querySelector(cssSelector).click()}, selector);

    await waitForAllXhrFinished(page, true)
}

async function waitForAllXhrFinished(page, waitLoadingModalHide) {
    let pendingXHR = await new PendingXHR(page);
    if (Number(pendingXHR.pendingXhrCount()) != 0) {
        await pendingXHR.waitForAllXhrFinished();
    }
    if (waitLoadingModalHide) {
        await page.waitForFunction("document.querySelector('"+cssSelectors.ATTRACTION.loading+"').getAttribute('style') == 'display: none;'");
    }
}

module.exports.getTextByCssSelector = getTextByCssSelector;
module.exports.clickButton = clickButton;
module.exports.waitForAllXhrFinished = waitForAllXhrFinished;