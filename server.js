'use strict';

const express = require('express');
require('dotenv').config();
const superagent = require('superagent');
const PORT = process.env.PORT || 3111;

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.static('./public'));
app.set('view engine', 'ejs');

app.get('/', (request, response) => {
  response.send('Made it home');
});

app.get('/hello', (request,response) => {
  response.render('pages/index.ejs');
});

app.listen(PORT, () => console.log(`up on PORT ${PORT}`));
