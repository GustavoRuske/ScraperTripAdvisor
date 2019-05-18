const {Client} = require('pg')
const client = new Client({
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
async function executeQuery(query) {
    client.connect()
    client.query(query, (err, res) => {
        if (err) {
          console.log(err.stack)
        } else {
          console.log(res.rows)
        }
        client.end()
    })
}

module.exports.executeQuery = executeQuery;