const express = require('express');
const routes = require('./controllers/routes')
const path = require("path");
const session = require('express-session');
const exphbs = require('express-handlebars');
const hbs = exphbs.create({});
// import sequelize connection
const sequelize = require('./config/connection')
const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
  secret: 'Super secret secret',
  resave: false,
  saveUninitialized: false,
};

app.use(session(sess));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(routes)
app.use(express.static(path.join(__dirname, 'public')));



// sync sequelize models to the database, then turn on the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});