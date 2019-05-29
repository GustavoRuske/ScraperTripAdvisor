const db = require("./database.js")
const memory = require("./memory.js")

async function serializeAndInsertOnDb(dataJson) {
    try {
        let objectMemory = await memory.memoryIdObject()
        let attractiveID = await db.findIdOrCreateAttractive(dataJson.name, dataJson.city)

        for (const category in dataJson.category) {
            await db.findIdOrCreateAttractiveCategory(Number(attractiveID), dataJson.category[category])
        }

        for (const review in dataJson.reviews) {
            dataJson.reviews[review].attractive = attractiveID
            dataJson.reviews[review].period = objectMemory.PERIOD[dataJson.reviews[review].period]
            dataJson.reviews[review].traveler = objectMemory.TRAVELERS_TYPE[dataJson.reviews[review].traveler]
            dataJson.reviews[review].total = await sumTotalReview(dataJson.reviews[review])
            await db.insertReview(dataJson.reviews[review])
        }
        console.log("Attractive inserted: " + dataJson.name)
    } catch (error) {
        console.log("erro ao serializar e inserir no banco")
    }
}

async function sumTotalReview(review) {
    let total = 0
    total = Number(review.excellent.replace(".", "")) + Number(review.very_good.replace(".", "")) + Number(review.reasonable.replace(".", "")) + Number(review.bad.replace(".", "")) + Number(review.horrible.replace(".", ""))
    return total
}

module.exports.serializeAndInsertOnDb = serializeAndInsertOnDb;