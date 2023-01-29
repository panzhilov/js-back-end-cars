// [x] initialize and configure Express app
// [x] initialize templating library
// [x] create home controller
// [x] bind routing
// [] create layout
// [] create data service
// [] implement controllers

const express = require('express');
const hbs = require('express-handlebars');

const carsService = require('./services/cars')

const { home } = require('./controllers/home');
const { create } = require('./controllers/create');
const { about } = require('./controllers/about');
const { details } = require('./controllers/details');
const { notFound } = require('./controllers/notFound');



const app = express();

app.engine('hbs', hbs.create({
    extname: '.hbs'
}).engine);
app.set('view engine', 'hbs');

app.use(express.urlencoded({ extended: true }));
app.use(express.static('static'));
app.use(carsService());

app.get('/', home)
app.get('/about', about)
app.get('/create', create)
app.get('/details/:id', details)

// app.all("*", notFound)

app.listen(3000, () => console.log('Server started on port 3000'));