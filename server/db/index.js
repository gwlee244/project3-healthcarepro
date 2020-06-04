/* Mongo Database
* - this is where we set up our connection to the mongo database
*/
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
let MONGO_URL;
const MONGO_LOCAL_URL = 'mongodb://admin:passw0rd@ds163757.mlab.com:63757/heroku_n00xmwvp';

if (process.env.MONGODB_URI) {
	mongoose.connect(process.env.MONGODB_URI, { 
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true });
	MONGO_URL = process.env.MONGODB_URI;
} else {
	mongoose.connect(MONGO_LOCAL_URL, { 
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true }); // local mongo url
	MONGO_URL = MONGO_LOCAL_URL;
}

// should mongoose.connection be put in the call back of mongoose.connect???
const db = mongoose.connection;
db.on('error', err => {
	console.log(`There was an error connecting to the database: ${err}`);
});

db.once('open', () => {
	console.log(`You have successfully connected to your mongo database: ${MONGO_URL}`);
});

module.exports = db;
