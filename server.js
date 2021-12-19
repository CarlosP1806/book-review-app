const express = require('express');

const app = express();
const PORT = process.env.PORT || 3001;

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.send('hi');
})

app.listen(PORT);