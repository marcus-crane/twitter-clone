const express = require('express');
const app = express();
const path = require('path');

app.set('view engine', 'ejs');
app.set('views', (__dirname + '/views'));
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.render('tweets');
})

app.post('/tweets/create', (req, res) => {
    res.send('Creating tweet...');
})

app.listen(8080, () => {
    console.log('Listening on Port 8080');
})