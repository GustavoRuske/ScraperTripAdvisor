// const _cliProgress = require('cli-progress');
const db = require('./database');
const scraper_attraction = require('./scraper_attraction_data');
const serializer = require('./serializer');

async function getUrlFromDbAndInsert() {
    let urlAttractive = await db.returnUrlNotScraped()

    while (urlAttractive != "") {
        await serializer.serializeAndInsertOnDb(await scraper_attraction.scrape_data(urlAttractive))
        await db.updateToScraped(urlAttractive)
        urlAttractive = await db.returnUrlNotScraped()
    }

    // await serializer.serializeAndInsertOnDb(await scraper_attraction.scrape_data("https://www.tripadvisor.com.br/Attraction_Review-g303576-d8661774-Reviews-Instituto_Ekko_Brasil-Florianopolis_State_of_Santa_Catarina.html"))
}

getUrlFromDbAndInsert()