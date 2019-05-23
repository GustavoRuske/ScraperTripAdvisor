const db = require("./database.js")
const memory = require("./memory.js")

async function main() {
    let objectMemory = await memory.memoryIdObject()
    const dataJson = { reviews:
        [ 
        { excellent: '43',
            very_good: '18',
            reasonable: '1',
            bad: '0',
            horrible: '0',
            period: 'mar_may',
            traveler: 'family' },
        { excellent: '4',
            very_good: '3',
            reasonable: '1',
            bad: '0',
            horrible: '0',
            period: 'mar_may',
            traveler: 'romantic' },
        { excellent: '0',
            very_good: '0',
            reasonable: '0',
            bad: '0',
            horrible: '0',
            period: 'mar_may',
            traveler: 'alone' },
        { excellent: '4',
            very_good: '0',
            reasonable: '0',
            bad: '0',
            horrible: '0',
            period: 'mar_may',
            traveler: 'business' },
        { excellent: '16',
            very_good: '10',
            reasonable: '1',
            bad: '0',
            horrible: '0',
            period: 'mar_may',
            traveler: 'friends' },
        { excellent: '13',
            very_good: '5',
            reasonable: '2',
            bad: '1',
            horrible: '0',
            period: 'jun_ago',
            traveler: 'family' },
        { excellent: '2',
            very_good: '1',
            reasonable: '1',
            bad: '0',
            horrible: '0',
            period: 'jun_ago',
            traveler: 'romantic' },
        { excellent: '0',
            very_good: '0',
            reasonable: '0',
            bad: '0',
            horrible: '0',
            period: 'jun_ago',
            traveler: 'alone' },
        { excellent: '0',
            very_good: '0',
            reasonable: '0',
            bad: '0',
            horrible: '0',
            period: 'jun_ago',
            traveler: 'business' },
        { excellent: '6',
            very_good: '7',
            reasonable: '0',
            bad: '0',
            horrible: '0',
            period: 'jun_ago',
            traveler: 'friends' },
        { excellent: '20',
            very_good: '15',
            reasonable: '2',
            bad: '0',
            horrible: '0',
            period: 'set_nov',
            traveler: 'family' },
        { excellent: '3',
            very_good: '0',
            reasonable: '0',
            bad: '0',
            horrible: '0',
            period: 'set_nov',
            traveler: 'romantic' },
        { excellent: '0',
            very_good: '0',
            reasonable: '0',
            bad: '0',
            horrible: '0',
            period: 'set_nov',
            traveler: 'alone' },
        { excellent: '1',
            very_good: '2',
            reasonable: '0',
            bad: '0',
            horrible: '0',
            period: 'set_nov',
            traveler: 'business' },
        { excellent: '13',
            very_good: '6',
            reasonable: '1',
            bad: '0',
            horrible: '0',
            period: 'set_nov',
            traveler: 'friends' },
        { excellent: '109',
            very_good: '67',
            reasonable: '7',
            bad: '3',
            horrible: '0',
            period: 'dez_fev',
            traveler: 'family' },
        { excellent: '20',
            very_good: '10',
            reasonable: '3',
            bad: '0',
            horrible: '0',
            period: 'dez_fev',
            traveler: 'romantic' },
        { excellent: '1',
            very_good: '0',
            reasonable: '0',
            bad: '0',
            horrible: '0',
            period: 'dez_fev',
            traveler: 'alone' },
        { excellent: '7',
            very_good: '0',
            reasonable: '0',
            bad: '0',
            horrible: '0',
            period: 'dez_fev',
            traveler: 'business' },
        { excellent: '58',
            very_good: '17',
            reasonable: '3',
            bad: '2',
            horrible: '2',
            period: 'dez_fev',
            traveler: 'friends' } ],
       name: 'Parque Aquático Cascanéia',
       city: 'Gaspar',
       category: [ 'Parques de diversões e aquáticos', 'Parques aquáticos' ],
       loading: 'Atualizando...' }

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


    // review.attractive, 
    // review.period,
    // review.travellers_type,
    // review.total,
    // review.excellent,
    // review.very_good,
    // review.reasonable, 
    // review.bad, 
    // review.horrible
}

async function sumTotalReview(review) {
    let total = 0
    total = Number(review.excellent) + Number(review.very_good) + Number(review.reasonable) + Number(review.bad) + Number(review.horrible)
    return total
}

main()


// for () {

// }
