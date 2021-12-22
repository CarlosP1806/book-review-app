const router = require('express').Router();
const axios = require('axios');
require('dotenv').config();

router.get('/', (req, res) => {
  res.render('homepage');
});

router.get('/search/:title', (req, res) => {
  // Fetch google books api to get data
  const fetchURL = `https://www.googleapis.com/books/v1/volumes?q=${req.params.title}&key=${process.env.API_KEY}`;
  axios({
    url: fetchURL,
    responseType: 'json'
  })
    .then(response => {
      bookData = response.data.items;
      res.render('search_results', { title: req.params.title, bookData: bookData });
    });
})

module.exports = router;