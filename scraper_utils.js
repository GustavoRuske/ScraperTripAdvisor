async function getTextByCssSelector(page, selector) {
    await page
            .waitForSelector(selector);

    await page
            .evaluate((querySelector) => {
                try {
                    return document.querySelector(querySelector).innerText;
                } catch (e) {
                    return null;
                }
            }, selector);
}

module.exports.getTextByCssSelector = getTextByCssSelector;