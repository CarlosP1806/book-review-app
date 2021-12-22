const express = require('express');
const routes = require('./controllers');
const db = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.use(routes);

db.once('open', () => {
    app.listen(PORT);
});