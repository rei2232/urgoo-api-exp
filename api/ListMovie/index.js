const pg = require('pg')
module.exports = async function (context, req) {
    const config = {
        user: 'urgoodbadmin@urgoodb',
        host: 'urgoodb.postgres.database.azure.com',
        database: 'urgoo',
        password: 'zi4KMMs729SnRsN',
        database: 'urgoo',
        port: 5432,
        ssl: true
    };

    // Create query to execute against the database
    const querySpec = {
        text: 'SELECT * FROM movie ORDER BY mid ASC'
    }

    try {
        // Create a pool of connections
        const pool = new pg.Pool(config);

        // Get a new client connection from the pool
        const client = await pool.connect();

        // Execute the query against the client
        const result = await client.query(querySpec);

        // Release the connection
        client.release();

        // Return the query resuls back to the caller as JSON
        context.res = {
            status: 200,
            isRaw: true,
            body: result.rows,
            headers: {
                'Content-Type': 'application/json'
            }
        };
    } catch (err) {
        context.log(err.message);
    }
}