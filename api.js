const Pool = require('pg').Pool
const pool = new Pool({
    user: 'urgoodbadmin@urgoodb',
    host: 'urgoodb.postgres.database.azure.com',
    database: 'urgoo',
    password: 'zi4KMMs729SnRsN',
    port: 5432,
    ssl: true
})
const listMovies = (request, response) => {
    pool.query('SELECT * FROM movie ORDER BY mid ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}
const createMovie = (request, response) => {
    const {title, image_url, director, mstate, duration, releasedate} = request.body

    pool.query('INSERT INTO movie (title, image_url, director, mstate, duration, releasedate) VALUES ($1, $2, $3, $4, $5, $6)', [title, image_url, director, mstate, duration, releasedate], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`Movie added with ID: ${results.insertId}`)
    })
}
module.exports = {
    createMovie,
    listMovies
}
