const puppeteer = require('puppeteer');
const scraper_utils = require('./scraper_utils');
const cssSelectors = require('./css_selectors');
const { PendingXHR } = require('pending-xhr-puppeteer');

async function scrape_data() {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    const pendingXHR = await new PendingXHR(page);
    await page.goto('https://www.tripadvisor.com.br/Attraction_Review-g2344316-d3893494-Reviews-Parque_Aquatico_Cascaneia-Gaspar_State_of_Santa_Catarina.html');
    await pendingXHR.waitForAllXhrFinished();
    await scrape_attractive_info(page)
    // await browser.close();
}

async function scrape_attractive_info(page) {
    const pendingXHR = await new PendingXHR(page);

    await scraper_utils.clickButton(page, cssSelectors.PERIOD.mar_may);
    await scraper_utils.clickButton(page, cssSelectors.TRAVELERS_TYPE.family);

    await scraper_utils.waitForAllXhrFinished(pendingXHR);
    await scrape_reviews(page)
}

async function scrape_reviews(page) {
    const reviews = {};
    for(selector in cssSelectors.REVIEW_COUNT) {
        if(cssSelectors.REVIEW_COUNT.hasOwnProperty(selector)) {
            reviews[selector] = await scraper_utils.getTextByCssSelector(page, cssSelectors.REVIEW_COUNT[selector])
        }
    }
    console.log(reviews);
    return reviews
}


scrape_data();