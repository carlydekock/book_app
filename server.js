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
  console.log('This is the query', request.body);
  console.log('THIS IS THE SEARCH', request.body.query);
  console.log('THIS IS HOW TO SEARCH', request.body['query-type']);
  const searchString = request.body.query;
  const typeOfSearch = request.body['query-type'];

  if(typeOfSearch === 'Search by Title'){
    const url = `https://www.googleapis.com/books/v1/volumes?q=+intitle:${searchString}&maxResults=10`;
    superagent.get(url).then(stuff => {
      console.log(stuff.body.items[0]);
      const titles = stuff.body.items.map(bookObj => new Book(bookObj));
      console.log(titles);
      response.render('pages/searches/show.ejs', {titles: titles});
    })
      .catch(error => {
        response.status(500).send('booksapi failed');
        console.log(error.message);
      });
  } else {
    const url = `https://www.googleapis.com/books/v1/volumes?q=+inauthor:${searchString}&maxResults=10`;
    superagent.get(url).then(stuff => {
      const titles = stuff.body.items.map(bookObj => new Book(bookObj));
      console.log(titles);
      response.render('pages/searches/show.ejs', {titles: titles});
    })
      .catch(error => {
        response.status(500).render('pages/error.ejs');
        console.log(error.message);
      });
  }
}

//Helper functions
function Book(object) {
  this.title = object.volumeInfo.title;
  this.author = object.volumeInfo.authors[0];
  this.description = object.volumeInfo.description;
  this.image = (object.volumeInfo.imageLinks.thumbnail !== null) ? object.volumeInfo.imageLinks.thumbnail: 'https://i.imgur.com/J5LVHEL.jpg';
}

app.listen(PORT, () => console.log(`up on PORT ${PORT}`));
