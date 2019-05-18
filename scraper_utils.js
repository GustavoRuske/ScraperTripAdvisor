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

async function waitForAllXhrFinished(pendingXHR) {
    let pendingXhrCount = Number(pendingXHR.pendingXhrCount())
    while( pendingXhrCount != 0) {
        console.log(Number(pendingXHR.pendingXhrCount()))
        await pendingXHR.waitForAllXhrFinished();
        pendingXhrCount = Number(pendingXHR.pendingXhrCount())
        console.log(Number(pendingXHR.pendingXhrCount()))
    }
}


module.exports.getTextByCssSelector = getTextByCssSelector;
module.exports.clickButton = clickButton;
module.exports.waitForAllXhrFinished = waitForAllXhrFinished;