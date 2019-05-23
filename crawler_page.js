const puppeteer = require('puppeteer');
const scraper_utils = require('./scraper_utils');
const cssSelectors = require('./css_selectors');
// const database = require('./database');
const { PendingXHR } = require('pending-xhr-puppeteer');

async function main() {
    let browser = await puppeteer.launch({headless: false});
    let page = await browser.newPage();
    
    await page.goto("https://www.tripadvisor.com.br/Attractions-g303570-Activities-State_of_Santa_Catarina.html");
    
    const hrefs = await page.$x('//*[@id="taplc_attraction_filters_clarity_0"]/div[2]//div//@href');

    let text = await page.evaluate(a => a.value, hrefs[0]);
    await page.goto("https://www.tripadvisor.com.br/"+text)
}

main()
