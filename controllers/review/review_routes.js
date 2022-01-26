const router = require('express').Router();

const Review = require('../../models/Review');

router.post('/', async (req, res) => {
  const review = await Review.create(req.body);
  if(!review) {
    res.status(400).json({ message: 'something went wrong' });
  }
  res.json(review);
});

router.get('/:id', async (req, res) => {
  const review = await Review.find({ _id: req.params.id });
  res.json(review);
});

router.put('/:id', async (req, res) => {
  const review = await Review.findByIdAndUpdate( req.params.id, req.body);
  res.json(review);
});

router.delete('/:id', async (req, res) => {
  const review = await Review.findByIdAndDelete(req.params.id);
  res.json(review);
});

router.get('/edit/:id', async (req, res) => {
  const review = await Review.find({ _id: req.params.id });
  res.render('write_review', { edit: true, reviewData: review });
});

module.exports = router;