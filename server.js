'use strict';

const express = require('express');
require('dotenv').config();
const superagent = require('superagent');
const PORT = process.env.PORT || 3111;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'));
app.set('view engine', 'ejs');

app.get('/', (request, response) => {
  response.send('Made it home');
});

app.get('/hello', (request, response) => {
  response.render('pages/index.ejs');
});

app.get('/searches/new', (request, response) => {
  response.render('pages/searches/new.ejs');
});

app.post('/searches', makeBookSearch);

function makeBookSearch(request, response) {
  const title = request.body.title;
  const url = `https://www.googleapis.com/books/v1/volumes?q=+intitle:${title}`;
  superagent.get(url).then(stuff => {
    console.log(stuff.body.items);
    // const title = stuff.body.items.map(item => item.volumeInfo.title);
    // response.render('pages/searches/new.ejs');
    response.send('a string');
  });
}

app.listen(PORT, () => console.log(`up on PORT ${PORT}`));
