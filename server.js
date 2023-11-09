const path = require('path')
const express = require('express');
const session = require('express-session')
const exphbs = require('express-handlebars');
const routes = require('./routes')

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({});

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

app.engine('handlebars', hbs.engine); // express: here's a new rendering engine
app.set('view engine', 'handlebars'); // express: make handlebars the default renderer

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')))

app.use(routes);


const okToSync = (process.env.NODE_ENV === 'production') ? false : true;
sequelize.sync({ force: okToSync}).then(()=> {
  app.listen(PORT, () => console.log('Now listening'))
})