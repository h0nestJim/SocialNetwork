const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

//create async function to get db connection establish
const connectDB = async() => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('**** Database Connection Established ****')

    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}
module.exports = connectDB;