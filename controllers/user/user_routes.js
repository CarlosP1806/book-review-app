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


module.exports = router;