const puppeteer = require('puppeteer');
const scraper_utils = require('./scraper_utils');
const cssSelectors = require('./css_selectors');
const attraction = {}
attraction.reviews = []

async function scrape_data(urlPage) {
    try {
        let browser = await puppeteer.launch({headless: true});
        let page = await browser.newPage();

        await page.goto(urlPage);

        await scrape_attraction_info(page)

        for(period in cssSelectors.PERIOD) {
            await scraper_utils.clickButton(page, cssSelectors.PERIOD[period]);
            for(traveler in cssSelectors.TRAVELERS_TYPE) {
                await scraper_utils.clickButton(page, cssSelectors.TRAVELERS_TYPE[traveler]);

                await scrape_attractive_review(page, period, traveler)

                await scraper_utils.clickButton(page, cssSelectors.TRAVELERS_TYPE[traveler]);
            }
            await scraper_utils.clickButton(page, cssSelectors.PERIOD[period]);
        }

        await browser.close();
        let attraction_return = attraction
        attraction = {}
        attraction.reviews = []

        return attraction_return

    } catch (error) {
        console.log("erro ao buscar os dados na url: " + urlPage);
        console.log("error: " + error);
        await browser.close();
    }
}

async function scrape_attractive_review(page, period, traveler) {
    await scraper_utils.waitForAllXhrFinished(page, true);
    await scrape_reviews(page, period, traveler)
}

async function scrape_reviews(page, period, traveler) {
    let reviews = {};

    for(selector in cssSelectors.REVIEW_COUNT) {
        if(cssSelectors.REVIEW_COUNT.hasOwnProperty(selector)) {
            reviews[selector] = await scraper_utils.getTextByCssSelector(page, cssSelectors.REVIEW_COUNT[selector])
        }
    }
    reviews.period = period
    reviews.traveler = traveler
    attraction.reviews.push(reviews)
}

async function scrape_attraction_info(page) {
    for(selector in cssSelectors.ATTRACTION) {
        let content = String(await scraper_utils.getTextByCssSelector(page, cssSelectors.ATTRACTION[selector]))
        attraction[selector] = selector == "category" ? content.split(", ") : content
    }
}

module.exports.scrape_data = scrape_data;