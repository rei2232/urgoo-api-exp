const express = require('express')
const path = require('path')
const db = require('./api')
const bodyParser = require('body-parser')
const app = express()
const port = 3001

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)
app.all('/*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// SECURITY
app.disable('x-powered-by');

app.post('/api/movie', db.createMovie)
app.get('/api/movie/list', db.listMovies)

app.listen(process.env.PORT || port, () => console.log("server is now running."))
