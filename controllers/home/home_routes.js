const router = require('express').Router();
const { authMiddleware, signToken } = require('../../utils/auth');
const axios = require('axios');
require('dotenv').config();

router.get('/', (req, res) => {
  res.render('homepage');
});

router.get('/search/:title/:cnt', (req, res) => {
  // Fetch google books api to get data
  const fetchURL = `https://www.googleapis.com/books/v1/volumes?q=${req.params.title}&key=${process.env.API_KEY}&maxResults=40`;
  axios({
    url: fetchURL,
    responseType: 'json'
  })
    .then(response => {
      bookData = response.data.items;
      res.render('search_results', { title: req.params.title, bookData: bookData, maxCount: req.params.cnt * 10 });
    });
});

router.get('/saved', (req, res) => {
  res.render('user_info');
});

module.exports = router;