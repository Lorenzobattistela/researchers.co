const { Client } = require("pg");
require("dotenv").config();

const credentials  = {
    user: process.env.DATABASE_USER,
    host: process.env.DATABASE_HOST || "localhost",
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT || 5432,
};

const client = new Client(credentials);

module.exports.clientDemo = async function() {
    const client = new Client(credentials);
    await client.connect();
    const now = await client.query("SELECT NOW()");
    await client.end();
    return now;
}


module.exports.getUniversities = async function (rows=100) {
    try {
        await client.connect()
        const query = `SELECT * FROM universities LIMIT $1;`
        const values = [rows];
        let results = await client.query(query, values);
        await client.end();
        return results;
    }
    catch(e) {
        console.log(e);
        return false;
    }
}