const { PendingXHR } = require('pending-xhr-puppeteer');

async function getTextByCssSelector(page, selector) {
    const element = await page.$(selector);
    return await (await element.getProperty('textContent')).jsonValue();
}

async function clickButton(page, selector, selectorLoading) {
    await page
        .waitForSelector(selector);
    
    await page
        .evaluate((cssSelector) => {document.querySelector(cssSelector).click()}, selector);

    await waitForAllXhrFinished(page, selectorLoading)
}

async function waitForAllXhrFinished(page, selectorLoading) {
    let pendingXHR = await new PendingXHR(page);
    if (Number(pendingXHR.pendingXhrCount()) != 0) {
        await pendingXHR.waitForAllXhrFinished();
    }
    if (selectorLoading) {
        await page.waitForFunction("document.querySelector('"+selectorLoading+"').getAttribute('style') == 'display: none;'");
    }
}

module.exports.getTextByCssSelector = getTextByCssSelector;
module.exports.clickButton = clickButton;
module.exports.waitForAllXhrFinished = waitForAllXhrFinished;