const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const moment = require('moment');

const Knex = require('knex');
const knexConfig = require('./knexfile');

const knex = Knex(knexConfig['development']);

app.set('view engine', 'ejs');
app.set('views', (__dirname + '/views'));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    knex('tweets').select()
    .then((query) => {
        for (i in query) {
            query[i].time_from_now = moment(query[i].created_at).fromNow();
        }
        res.render('tweets', { tweets: query });
    })
})

app.get('/tweets/:id([0-9]+)/edit', (req, res) => {
    knex('tweets').where('id', req.params.id)
    .then((response) => {
        if (response.length === 0) {
            res.redirect('/')
            console.log('No tweet found')
        } else {
            res.render('edit-tweet', { tweet: response[0] }) 
        }
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