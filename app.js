const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

app.set('view engine', 'ejs');
app.set('views', (__dirname + '/views'));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('tweets');
})

app.post('/tweets/create', (req, res) => {
    let username = req.body.username;
    let message = req.body.message;

    console.log(`Username: ${username}`)
    console.log(`Message: ${message}`)
    
    res.send('Creating tweet...');
})

app.listen(8080, () => {
    console.log('Listening on Port 8080');
})