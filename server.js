// Require Statments
const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const routes = require('./controllers');
const helpers = require('./utils/helpers')

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Sets up Express App
const app = express();
const PORT = process.env.PORT || 3001;

// Sets up handlebars.js with helpers
const hbs = exphbs.create({ helpers });

// Session
const sess = {
  secret: 'xD0gPEcYLsWS8f',
  cookie: {
    maxAge: 1 * 24 * 60 * 60 * 1000, //expires after 1 day
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess))

// Inform Express.js on which template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')))

app.use(routes);

// Starts the server to begin listening
const okToSync = (process.env.NODE_ENV === 'production') ? false : true;
sequelize.sync({ force: false}).then(()=> {
  app.listen(PORT, () => console.log('Now listening at http://localhost' + PORT))
});