const {Pool} = require('pg')
const pool = new Pool({
    user: "postgres",
    password: "123",
    host: "localhost",
    port: 5432,
    database: "tripadvisorData"
})

// const query = {
//     text: 'INSERT INTO public.attractive(city, name) VALUES($1, $2)',
//     values: ['JOINVILLE', 'TESTE2'],
// }
async function createConnection() {
    pool.connect()
}
async function endConnection() {
    pool.end()
}
async function executeQuery(query) {
    try {
        const res = await pool.query(query.text, query.values)
        return res
    } catch(err) {
        console.log(err.stack)
    }
}

async function findIdOrCreate(constSelect, constInsert) {
    let queryResultSelect = await executeQuery(constSelect)

    if(queryResultSelect.rows.length > 0) {
        return queryResultSelect.rows[0].id
    } else {
        let queryResultInsert = await executeQuery(constInsert)
        return queryResultInsert.rows[0].id
    }
}
async function findIdOrCreateAttractive(name, city) {
    let values =  [name, city]
    let constSelect = {
        text: "SELECT id FROM public.attractive WHERE name = $1 and city = $2",
        values: values
    }
    let constInsert = {
        text: "INSERT INTO public.attractive(name, city) VALUES ($1, $2) RETURNING id",
        values: values
    }

    return await findIdOrCreate(constSelect, constInsert)
}

async function findIdOrCreateTable(table, name) {//Category, period, traveller_type
    let constSelect = {
        text: "SELECT id FROM public." + table + " WHERE name = $1",
        values: [name]
    }
    let constInsert = {
        text: "INSERT INTO public." + table + "(name) VALUES ($1) RETURNING id",
        values: [name]
    }

    return await findIdOrCreate(constSelect, constInsert)
}

async function findIdOrCreateAttractiveCategory(attractive_id, category_name) {
    let category_id = await findIdOrCreateTable("category", category_name)

    let constSelect = {
        text: "SELECT id FROM public.attractive_category WHERE attractive_id = $1 and category_id = $2",
        values: [Number(attractive_id), Number(category_id)]
    }
    let constInsert = {
        text: "INSERT INTO public.attractive_category(attractive_id, category_id) VALUES ($1, $2) RETURNING id",
        values: [Number(attractive_id), Number(category_id)]
    }

    return await findIdOrCreate(constSelect, constInsert)
}

async function insertReview(review) {
    let constInsert = {
        text: "INSERT INTO public.review(attractive_id, period_id, travellers_type_id, review_total, review_excellent, review_very_good, review_reasonable, review_bad, review_horrible)"+
        "VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)",
        values: [Number(review.attractive), 
                Number(review.period),
                Number(review.traveler),
                Number(review.total),
                Number(review.excellent),
                Number(review.very_good),
                Number(review.reasonable), 
                Number(review.bad), 
                Number(review.horrible)
            ]
    }

    let result = await executeQuery(constInsert)
    return result.rows
}

async function insertUrlQueue(url) {
    let constInsert = {
        text: 'INSERT INTO public.url("urlAttractive", scraped) VALUES ($1, $2)',
        values: [url, false]
    }

    await executeQuery(constInsert)
}

async function updateToScraped(url) {
    let constUpdate = {
        text: 'UPDATE public.url SET scraped = true WHERE "urlAttractive" = $1',
        values: [url]
    }
    await executeQuery(constUpdate)
}

async function returnUrlNotScraped() {
    let constSelect = {
        text: 'SELECT "urlAttractive" FROM public.url where scraped = false limit 1',
        values: []
    }

    let result = await executeQuery(constSelect)
    if (result.rows.length > 0 ) {
        return result.rows[0].urlAttractive
    } else {
        return ""
    }
}

module.exports.executeQuery = executeQuery;
module.exports.findIdOrCreateAttractive = findIdOrCreateAttractive;
module.exports.findIdOrCreateTable = findIdOrCreateTable;
module.exports.findIdOrCreateAttractiveCategory = findIdOrCreateAttractiveCategory;
module.exports.insertReview = insertReview;
module.exports.createConnection = createConnection;
module.exports.endConnection = endConnection;
module.exports.insertUrlQueue = insertUrlQueue;
module.exports.updateToScraped = updateToScraped;
module.exports.returnUrlNotScraped = returnUrlNotScraped;
