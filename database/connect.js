const { Client } = require("pg")
 
const connectDB = async (pguser, pghost, pgdb, pgpass, psport) => {
    try {
        const client = new Client({
            user:pguser,
            host: pghost,
            database: pgdb,
            password: pgpass,
            port: psport
        })
 
        await client.connect()
        const res = await client.query('SELECT * FROM pg_settings')
        console.log(res)
        await client.end()
    } catch (error) {
        console.log(error)
    }
}
 
module.exports = { connectDB };
