const express = require('express');
const mongoose = require('mongoose');
const config = require('./config');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const compress = require('compression');
const path = require('path');
const winston = require('winston');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const authenticate = require('./src/utils/authenticate');
const AuthenticationClient = require('auth0').AuthenticationClient;
const auth0 = new AuthenticationClient({
  domain: `${config.AUTH0_ACCOUNT}.auth0.com`,
  clientId: config.AUTH0_CLIENTID,
});

const userController = require('./src/controllers/userController');
mongoose.connect(config.db);
const db = mongoose.connection;
db.on('error', () => {
  throw new Error(`unable to connect to database at ${config.db}`);
});
const app = express();
const winstonLogger = new winston.Logger({
  transports: [
    new winston.transports.Console({
      handleExceptions: true,
      json: true,
      stringify: true,
    }),
  ],

  exitOnError: false,
});
app.winston = winstonLogger;
app.auth0 = auth0;
//
// Register Node.js middleware
// -----------------------------------------------------------------------------
app.use(express.static(path.join(__dirname, 'public')));
app.use(compress());
app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: config.sessionSecret,
  store: new MongoStore({
    url: config.db,
    autoReconnect: true,
  }),
}));
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.user = req.user;

  next();
});

app.get('/', (req, res) => {
  res.json({
    app: 'naloxone-app',
    env: config.env,
  });
});

app.post('/login', userController.postLogin);
app.post('/users', userController.postSignup);
app.get('/users', authenticate, userController.getUser);
app.get('/users/:id', userController.getUser);
app.put('/users/:id', authenticate, userController.updateUser);
app.post('/users/:id', authenticate, userController.updateUser);
app.use('/alerts/', require('./src/routes/alerts')());
app.listen(config.port, () => {
  console.log(`The server is running at http://localhost:${config.port}/`);
});
