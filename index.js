// [x] initialize and configure Express app
// [x] initialize templating library
// [x] create home controller
// [x] bind routing
// [x] create layout
//  create data service
//  - [x] read ll
//  - [x] read one by id
//  - [x] create
//  - [x] edit
//  - [x] delete
//  - [x] search
//  - [] accessory read
//  - [] accessory create
//  - [] attach accessory
//  implement controllers
//  - [x] home (catalog)
//  - [x] about
//  - [x] details
//  - [x] create
//  - [x] improved home(search)
//  - [x] edit
//  - [x] delete
//  - [] create asseccory
//  - [] attach accessory to car
//  - [] update dettails to include accessory
//  - [x] add front-end code
//  - [x] add database connection
//  - [x] create Car model
//  - [x] upgrade car service to use car model
//  - [] add validation rules to car model
//  - [] create Accessory model

const express = require('express');
const hbs = require('express-handlebars');

const initDb = require('./models/index');

const carsService = require('./services/cars')

const { home } = require('./controllers/home');
const create = require('./controllers/create');
const deleteCar = require('./controllers/delete');
const editCar = require('./controllers/edit');
const { about } = require('./controllers/about');
const { details } = require('./controllers/details');
const { notFound } = require('./controllers/notFound');
const accessory = require('./controllers/accessory');

start();

async function start() {
    initDb();

    const app = express();

    app.engine('hbs', hbs.create({
        extname: '.hbs'
    }).engine);
    app.set('view engine', 'hbs');

    app.use(express.urlencoded({ extended: true }));
    app.use('/static', express.static('static'));
    app.use(carsService());

    app.get('/', home)
    app.get('/about', about)
    app.get('/details/:id', details)
    app.get('/create', create.get)
    app.post('/create', create.post)
    app.get('/delete/:id', deleteCar.get);
    app.post('/delete/:id', deleteCar.post);
    app.get('/edit/:id', editCar.get);
    app.post('/edit/:id', editCar.post);
    app.get('/accessory', accessory.get);
    app.all("*", notFound)

    app.listen(3000, () => console.log('Server started on port 3000'));
}