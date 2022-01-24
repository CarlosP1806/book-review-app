const router = require('express').Router();
const axios = require('axios');
require('dotenv').config();

const Review = require('../../models/Review');

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
      const bookData = response.data.items;
      res.render('search_results', { title: req.params.title, bookData: bookData, maxCount: req.params.cnt * 10 });
    });
});

router.get('/book/:id', async (req, res) => {
  const fetchURL = `https://www.googleapis.com/books/v1/volumes/${req.params.id}`;
  axios({
    url: fetchURL,
    responseType: 'json'
  })
    .then(async response => {
      const bookData = response.data;

      // Remove google books html tags using regex
      bookData.volumeInfo.description = 
        bookData.volumeInfo.description.replace(/<\/?\w+>/ig,'');
      bookData.volumeInfo.description =
        bookData.volumeInfo.description.replace(/&quot;/ig, '"');

      const reviews = await Review.find({bookId: bookData.id}).populate('authorId');
      res.render('book_info', { bookData: bookData, reviews: reviews });
    });
});

router.get('/book/:id/review', (req, res) => {
  const fetchURL = `https://www.googleapis.com/books/v1/volumes/${req.params.id}`;
  axios({
    url: fetchURL,
    responseType: 'json'
  })
    .then(response => {
      const bookData = response.data;
      res.render('write_review', { bookData: bookData });
    })
});

router.post('/review', async (req, res) => {
  const review = await Review.create(req.body);
  if(!review) {
    res.status(400).json({ message: 'something went wrong' });
  }
  res.json(review);
});

module.exports = router;