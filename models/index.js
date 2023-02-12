const mongoose = require('mongoose');

const Car = require('./Car');
const Accessory = require('./Accessory');

const connectionString = 'mongodb://localhost:27017/carbicle';
mongoose.set('strictQuery', false);

async function init() {
    try {
        await mongoose.connect(connectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('Database connected');

        mongoose.connection.on('error', (err) => {
            console.error('Database eroor');
            console.error(err);
        })
    } catch (err) {
        console.error('Error connection to database');
        process.exit(1);
    }
}

module.exports = init