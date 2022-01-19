const router = require('express').Router();
const { authMiddleware, signToken } = require('../../utils/auth');
const User = require('../../models/User');

router.post('/', async (req, res) => {
  try {
    const user = await User.create(req.body);
    if (!user) {
      res.status(400).json({ message: 'Something went wrong' });
    }
    const token = signToken(user);
    res.json({ token, user });
  } catch(error) {
    console.log(error);
    res.status(500).json({ message: 'Invalid fields '});
  }
});

router.post('/login', async ({ body }, res) => {
  const user = await User.findOne({
    $or: [{ username: body.username }, { email: body.email }]
  });
  if (!user) {
    res.status(400).json({ message: 'Cannot find user' });
  } else {
    // Validate password
    const correctPassword = await user.isCorrectPassword(body.password);
    if (!correctPassword) {
      res.status(400).json({ message: 'Incorrect password' });
    } else {
      const token = signToken(user);
      res.json({ token, user });
    }
  }
});

// Get the current user data (if any)
router.get('/me', authMiddleware, async ({ user = null, params }, res) => {
  const foundUser = await User.findOne({
    $or: [{ _id: user ? user._id : params.id }, { username: params.username }]
  });

  if (!foundUser) {
    res.status(400).json({ message: 'Cannot find user' });
  } else {
    res.json(foundUser);
  }
});

router.get('/reviews', (req, res) => {
  res.render('user_reviews.ejs');
});

module.exports = router;