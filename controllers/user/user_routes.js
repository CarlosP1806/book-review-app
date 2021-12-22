const router = require('express').Router();
const { authMiddleware, signToken } = require('../../utils/auth');
const User = require('../../models/User');

router.post('/', async (req, res) => {
  const user = await User.create(req.body);

  if (!user) {
    res.status(400).json({ message: 'Something went wrong' });
  }

  const token = signToken(user);
  res.json({ token, user });
});

router.post('/login', async ({ body }, res) => {
  const user = await User.findOne({
    $or: [{ username: body.username }, { email: body.email }]
  });
  if (!user) {
    res.status(400).json({ message: 'Cannot find user' });
  } else {
    // Validate password
    if (body.password !== user.password) {
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

module.exports = router;