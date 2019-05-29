const db = require('./database');
const cssSelector = require('./css_selectors').A;

async function memoryIdObject() {

    let memoryId = {
        TRAVELERS_TYPE:{
        },
        PERIOD: {
        }
    }

    for (const selector in cssSelector.PERIOD) {
        memoryId.PERIOD[selector] = await db.findIdOrCreateTable("period", selector)
    }

    for (const selector in cssSelector.TRAVELERS_TYPE) {
        memoryId.TRAVELERS_TYPE[selector] = await db.findIdOrCreateTable("TRAVELLERS_TYPE", selector)
    }
    return memoryId
}

module.exports.memoryIdObject = memoryIdObject;