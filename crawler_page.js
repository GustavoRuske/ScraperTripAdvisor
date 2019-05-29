const puppeteer = require('puppeteer')
const cssSelectors = require('./css_selectors').A;
const db = require('./database')

async function main() {
    let browser = await puppeteer.launch({headless: true})
    let page = await browser.newPage()
    
    await page.goto("https://www.tripadvisor.com.br/Attractions-g303570-Activities-State_of_Santa_Catarina.html")

    const hrefs = await getAllUrl(page, cssSelectors.MAIN_PAGE.xpath_first_filter_checkbox_hrefs)

    for (let index = 0; index < hrefs.length; index++) {
        await page.goto("https://www.tripadvisor.com.br" + hrefs[index])

        const hrefsSubCategory = await getAllUrl(page, cssSelectors.MAIN_PAGE.xpath_second_filter_checkbox_hrefs)

        for (let x = 0; x < hrefsSubCategory.length; x++) {
            await page.goto("https://www.tripadvisor.com.br" + hrefsSubCategory[x])
            let urlAttractive = await getAllUrl(page, cssSelectors.MAIN_PAGE.xpath_url_attraction)
            for (let i = 0; i < urlAttractive.length; i++) {
                await db.insertUrlQueue("https://www.tripadvisor.com.br"+urlAttractive[i])
            }
        }
    }
    await page.close()
}

async function getAllUrl(page, cssSelector) {
    let urls = []
    const hrefs = await page.$x(cssSelector);
    for (let index = 0; index < hrefs.length; index++) {
        url = await page.evaluate(a => a.value, hrefs[index]);
        urls.push(url)
    }
    return urls
}

// main()
