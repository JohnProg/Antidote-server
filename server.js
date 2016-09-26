const express = require('express');
const mongoose = require('mongoose');
const config = require('./config');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const compress = require('compression');
const path = require('path');

mongoose.connect(config.db);
const db = mongoose.connection;
db.on('error', function () {
  throw new Error('unable to connect to database at ' + config.db);
});
const app = express();

//
// Register Node.js middleware
// -----------------------------------------------------------------------------
app.use(express.static(path.join(__dirname, 'public')));
app.use(compress());
app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/alerts/', require('./src/routes/alerts')());
app.listen(config.port, () => {
    console.log(`The server is running at http://localhost:${config.port}/`);
});