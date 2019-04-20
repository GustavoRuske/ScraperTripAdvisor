const puppeteer = require('puppeteer');
const scraper_utils = require('./scraper_utils');
const selectors = require('./css_selectors');
const { PendingXHR } = require('pending-xhr-puppeteer');

async function scrape_data() {

    const cssSelector = selectors.getCssSelectors();
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    
    await page.goto('https://www.tripadvisor.com.br/Attraction_Review-g2344316-d3893494-Reviews-Parque_Aquatico_Cascaneia-Gaspar_State_of_Santa_Catarina.html');

    const pendingXHR = new PendingXHR(page);
    
    await page.evaluate(()=>document.querySelector("#taplc_detail_filters_ar_responsive_0 > div > div.collapsible.is-shown-at-tablet > div > div.ui_columns.filters > div:nth-child(2) > div > div.content > div > div:nth-child(1) > label").click());
    await page.evaluate(()=>document.querySelector(cssSelector.PERIOD.mar_may).click());

    await pendingXHR.waitForAllXhrFinished(cssSelector.REVIEW_COUNT.excellent);

    const result = await scraper_utils.getTextByCssSelector(page, cssSelector.REVIEW_COUNT.excellent)

    console.log(result)
    console.log("FIM!!!");

    //   await browser.close();
}

scrape_data();