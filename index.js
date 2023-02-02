// [x] initialize and configure Express app
// [x] initialize templating library
// [x] create home controller
// [x] bind routing
// [x] create layout
//  create data service
//  - [x] read ll
//  - [x] read one by id
//  - [x] create
//  - [] edit
//  - [] delete
//  - [] search
//  implement controllers
//  - [x] home (catalog)
//  - [x] about
//  - [x] details
//  - [x] create
//  - [x] improved home(search)
//  - [] edit
//  - [] delete
//  - [x] add front-end code

const express = require('express');
const hbs = require('express-handlebars');

const carsService = require('./services/cars')

const { home } = require('./controllers/home');
const  create  = require('./controllers/create');
const deleteCar = require('./controllers/delete');
const { about } = require('./controllers/about');
const { details } = require('./controllers/details');
const { notFound } = require('./controllers/notFound');



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

app.all("*", notFound)

app.listen(3000, () => console.log('Server started on port 3000'));