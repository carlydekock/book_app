'use strict';

const express = require('express');
require('dotenv').config();
const superagent = require('superagent');
const PORT = process.env.PORT || 3111;
const pg = require('pg');
const app = express();
const client = new pg.Client(process.env.DATABASE_URL);

app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'));
app.set('view engine', 'ejs');


// Routes
//Home Route
app.get('/', (request, response) => {
  const booksDataBase = `SELECT * FROM books`;
  client.query(booksDataBase).then(results => {
    response.render('pages/index.ejs', {books: results.rows});
  });
});

//Single book search to view details route
app.get('/books/:id', getBookInfo);

//Form to input for search
app.get('/searches/new', (request, response) => {
  response.render('pages/searches/new.ejs');
});

//Search results page
app.post('/searches', makeBookSearch);

app.post('/books', saveBook);


// Route Callbacks
function getBookInfo(request, response) {
  const id = request.params.id;
  const SQL = `SELECT * FROM books WHERE id=$1`;
  const values = [id];
  client.query(SQL, values).then(results => {
    console.log('!!!!!!!!!!!!!!', results.rows);
    response.render('pages/books/detail.ejs', {book: results.rows[0]});
  });
  // response.send('Made it to books id');
}


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

function saveBook(request, response) {
  // console.log(request.body);
  const savedBookObject = request.body;
  console.log(request.body);
  // const savedBookObject = new Book(savedBookObject);
  // //Save to database
  const sqlQuery = 'INSERT INTO books (title, author, isbn, image_url, description) VALUES($1, $2, $3, $4, $5) RETURNING id';
  const sqlArray = [savedBookObject.title, savedBookObject.author, savedBookObject.isbn, savedBookObject.image, savedBookObject.description];
  console.log(sqlArray);
  client.query(sqlQuery, sqlArray).then(results => {
    console.log('THIS IS RESULTS FROM DB', results.rows);
    response.redirect(`/books/${results.rows[0].id}`);
  });
  // console.log(savedBooks);
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
