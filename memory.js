const db = require('./database');
const cssSelector = require('./css_selectors');

async function memoryIdObject() {

    let memoryId = {
        TRAVELERS_TYPE:{
        },
        PERIOD: {
        }
    }

    await db.createConnection()

    for (const selector in cssSelector.PERIOD) {
        memoryId.PERIOD[selector] = await db.findIdOrCreateTable("period", selector)
    }

    for (const selector in cssSelector.TRAVELERS_TYPE) {
        memoryId.TRAVELERS_TYPE[selector] = await db.findIdOrCreateTable("TRAVELLERS_TYPE", selector)
    }

    await db.endConnection()
    return memoryId
}

module.exports.memoryIdObject = memoryIdObject;