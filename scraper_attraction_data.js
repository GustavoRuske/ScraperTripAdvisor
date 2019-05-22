const puppeteer = require('puppeteer');
const scraper_utils = require('./scraper_utils');
const cssSelectors = require('./css_selectors');
// const database = require('./database');
const { PendingXHR } = require('pending-xhr-puppeteer');
const attraction = {}
attraction.reviews = []

async function scrape_data(urlPage) {
    await scrape_attraction_info(urlPage)

    for(period in cssSelectors.PERIOD) {
        for(traveler in cssSelectors.TRAVELERS_TYPE) {
            let browser = await puppeteer.launch({headless: true});
            let page = await browser.newPage();
            let pendingXHR = await new PendingXHR(page);

            await page.goto(urlPage);
            await pendingXHR.waitForAllXhrFinished(pendingXHR, page, cssSelectors.ATTRACTION.loading);

            await scrape_attractive_review(page, period, traveler)

            await browser.close();
        }
    }

    console.log(attraction)
}

async function scrape_attractive_review(page, period, traveler) {
    let pendingXHR = await new PendingXHR(page);

    await scraper_utils.clickButton(page, cssSelectors.PERIOD[period]);
    await scraper_utils.clickButton(page, cssSelectors.TRAVELERS_TYPE[traveler]);

    await scraper_utils.waitForAllXhrFinished(pendingXHR, page, cssSelectors.ATTRACTION.loading);
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
    console.log(reviews)
}

async function scrape_attraction_info(urlPage) {
    let browser = await puppeteer.launch({headless: true});
    let page = await browser.newPage();
    let pendingXHR = await new PendingXHR(page);

    await page.goto(urlPage);
    await pendingXHR.waitForAllXhrFinished(pendingXHR, page);

    for(selector in cssSelectors.ATTRACTION) {
        let content = String(await scraper_utils.getTextByCssSelector(page, cssSelectors.ATTRACTION[selector]))
        attraction[selector] = selector == "category" ? content.split(", ") : content
    }
    await browser.close();
    console.log(attraction)
}

// scrape_data('https://www.tripadvisor.com.br/Attraction_Review-g2344316-d3893494-Reviews-Parque_Aquatico_Cascaneia-Gaspar_State_of_Santa_Catarina.html')
scrape_data("https://www.tripadvisor.com.br/Attraction_Review-g680306-d8048445-Reviews-Passeio_San_Miguel-Balneario_Camboriu_State_of_Santa_Catarina.html")