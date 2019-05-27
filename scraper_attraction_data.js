const puppeteer = require('puppeteer');
const scraper_utils = require('./scraper_utils');
const selectors = require('./css_selectors')
let attraction = {}
attraction.reviews = []

async function scrape_data(urlPage) {
    try {
        let browser = await puppeteer.launch({headless: true});
        let page = await browser.newPage();

        await page.goto(urlPage);
        let cssSelectors = selectors.A;
        try {
            await page.waitForSelector(cssSelectors.PERIOD.mar_may, { timeout: 6000 })
        } catch (error) {
            cssSelectors = selectors.B;
        }

        await scrape_attraction_info(page, cssSelectors)
        console.log("Attraction inicio -> " + attraction.name)
        for(period in cssSelectors.PERIOD) {
            await scraper_utils.clickButton(page, cssSelectors.PERIOD[period], cssSelectors.ATTRACTION.loading);
            for(traveler in cssSelectors.TRAVELERS_TYPE) {
                await scraper_utils.clickButton(page, cssSelectors.TRAVELERS_TYPE[traveler], cssSelectors.ATTRACTION.loading);

                await scrape_reviews(page, period, traveler, cssSelectors)

                await scraper_utils.clickButton(page, cssSelectors.TRAVELERS_TYPE[traveler], cssSelectors.ATTRACTION.loading);
            }
            await scraper_utils.clickButton(page, cssSelectors.PERIOD[period], cssSelectors.ATTRACTION.loading);
        }

        await browser.close();
        let attraction_return = attraction
        console.log("Attraction scraped -> " + attraction.name)
        attraction = {}
        attraction.reviews = []
        return attraction_return

    } catch (error) {
        console.log("erro ao buscar os dados na url -> " + urlPage);
        console.log("error -> " + error);
    }
}

async function scrape_reviews(page, period, traveler, cssSelectors) {
    await scraper_utils.waitForAllXhrFinished(page, cssSelectors.ATTRACTION.loading);
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

async function scrape_attraction_info(page, cssSelectors) {
    for(selector in cssSelectors.ATTRACTION) {
        if (selector == "category") {
            try {
                await page.waitForSelector(cssSelectors.UTILS.plusButton, { timeout: 6000 })
                await scraper_utils.clickButton(page, cssSelectors.UTILS.plusButton)
            } catch (error) {}
        }
        let content = String(await scraper_utils.getTextByCssSelector(page, cssSelectors.ATTRACTION[selector]))
        attraction[selector] = selector == "category" ? content.split(", ") : content
    }
}

module.exports.scrape_data = scrape_data;