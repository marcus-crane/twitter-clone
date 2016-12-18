const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

const Knex = require('knex')
const knexConfig = require('./knexfile')

const knex = Knex(knexConfig['development'])

app.set('view engine', 'ejs');
app.set('views', (__dirname + '/views'));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    knex('tweets').select()
    .then((query) => {
        res.render('tweets', { tweets: query })
    })
})

app.post('/tweets/create', (req, res) => {
    res.send('Creating tweet...');
    knex('tweets')
      .insert({ username: req.body.username, message: req.body.message })
      .finally(() => knex.destroy());
})

app.listen(8080, () => {
    console.log('Listening on Port 8080');
})