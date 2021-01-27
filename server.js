'use strict';

const express = require('express');
require('dotenv').config();
const superagent = require('superagent');
const PORT = process.env.PORT || 3111;
const pg = require('pg');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'));
app.set('view engine', 'ejs');
const client = new pg.Client(process.env.DATABASE_URL);

app.get('/', (request, response) => {
  const booksDataBase = `SELECT * FROM books`;
  client.query(booksDataBase).then(results => {
    response.render('pages/index.ejs', {books: results.rows});
  });
});

// app.get('/hello', (request, response) => {
//   response.render('pages/index.ejs');
// });

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
      // console.log(stuff.body.items[0].volumeInfo.industryIdentifiers);
      const titles = stuff.body.items.map(bookObj => new Book(bookObj));
      // console.log(titles);
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
  this.title = object.volumeInfo.title ? object.volumeInfo.title : `No Title Information`;
  this.author = object.volumeInfo.authors ? object.volumeInfo.authors[0] :`Author Unknown`;
  this.description = object.volumeInfo.description ? object.volumeInfo.description : `No Description`;
  this.image = object.volumeInfo.imageLinks ? object.volumeInfo.imageLinks.thumbnail: 'https://i.imgur.com/J5LVHEL.jpg';
  this.isbn = `${object.volumeInfo.industryIdentifiers[0].type} : ${object.volumeInfo.industryIdentifiers[0].identifier}`;
}

client.on('error', (error) => console.log(error));
client.connect();

app.listen(PORT, () => console.log(`up on PORT ${PORT}`));
