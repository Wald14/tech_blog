// Dependencies
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const path = require('path');
const routes = require('./controllers');

// Import and incorporate custom helpers
const helpers = require('./utils/helpers')
const hbs = exphbs.create({ helpers });

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Sets up Express App
const app = express();
const PORT = process.env.PORT || 3001;


const sess = {
  secret: 'xD0gPEcYLsWS8f',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess))

// Set up handlebars
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')))

app.use(routes);

// Starts the server to begin listening
const okToSync = (process.env.NODE_ENV === 'production') ? false : true;
sequelize.sync({ force: true}).then(()=> {
  app.listen(PORT, () => console.log('Now listening at http://localhost' + PORT))
});