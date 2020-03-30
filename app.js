let fs = require('fs');
let path = require('path');
let express = require('express');
let handlebars = require('express-handlebars');
let session = require('express-session');
let pg = require('pg');
let Knex = require('knex');
let { Model } = require('objection');

let app = express();

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = app.get('env');
}

app.set('view engine', 'hbs');
app.engine('hbs', handlebars({
  layoutsDir: __dirname + '/views/layouts',
  extname: 'hbs',
  defaultLayout: 'layout'
}));

app.root = (...args) => path.join(__dirname, ...args);
app.inProduction = () => app.get('env') === 'production';
app.inDevelopment = () => app.get('env') === 'development';
console.log('APP.ROOT: ', app.root('public'));

app.use(express.static(app.root('public')));
app.use(express.urlencoded({ extended: false }));
app.use(session({ secret: 'hello' }));


let dbConfig = require(app.root('knexfile'));
let knex = Knex(dbConfig[process.env.NODE_ENV]);
Model.knex(knex);

let routes = require('./routes');
app.use('/', routes);

module.exports = app;
