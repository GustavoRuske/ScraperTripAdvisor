async function getTextByCssSelector(page, selector) {
    const element = await page.$(selector);
    return await (await element.getProperty('textContent')).jsonValue();
}

async function clickButton(page, selector) {
    await page
        .waitForSelector(selector);
    
    await page
        .evaluate((cssSelector) => {document.querySelector(cssSelector).click()}, selector);
}

async function waitForAllXhrFinished(pendingXHR, page, selector) {
    let pendingXhrCount = Number(pendingXHR.pendingXhrCount())
    while( pendingXhrCount != 0) {
        await pendingXHR.waitForAllXhrFinished();
        pendingXhrCount = Number(pendingXHR.pendingXhrCount())
    }

    if (selector) {
        await page.waitForFunction("document.querySelector('"+selector+"').getAttribute('style') == 'display: none;'");
    }
}

module.exports.getTextByCssSelector = getTextByCssSelector;
module.exports.clickButton = clickButton;
module.exports.waitForAllXhrFinished = waitForAllXhrFinished;