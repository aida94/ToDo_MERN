const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');

// User Model
const User = require('../../models/User');


// @route   Post api/auth/login
// @desc    User Login
// @access  Public
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  try {
    // Check if user exist
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({msg: 'User does not exist'})
    }

    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user.id }, config.get('jwtSecret'), { expiresIn: 3600 });
    return res.json({ token, user });

  } catch (error) {
      throw(error);
  }

});

// @route   Post api/auth/register
// @desc    Register new user
// @access  Public
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  // Validate input
  if (!username.trim() || !email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields!' });
  }
  if (!(/^[\-0-9a-zA-Z\.\+_]+@[\-0-9a-zA-Z\.\+_]+\.[a-zA-Z]{2,}$/).test(String(email))) {
    return res.status(400).json({ msg: 'Email Invalid!' });
  }
  if (password.length < 6) {
    return res.status(400).json({ msg: 'Password must be more then 6 character!' });
  }

  try {
    // Check if user with the same email exist
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exist' });
    }

    const salt = await bcrypt.genSalt(10); // generate salt
    const encryptedPassword = await bcrypt.hash(password, salt); // generate hash password
    const newUser = await User.create({ username, email, password:encryptedPassword }); // create user in db
    const token = jwt.sign({ id: newUser.id }, config.get('jwtSecret'), { expiresIn: 3600 });
    return res.json({ token, user: newUser });

  } catch(error) {
      throw error;
  }
});

// @route   Get api/auth/user
// @desc    Get user data
// @access  Private
router.get('/user', auth, async (req, res) => {

  try {
    const user = await User.findById(req.user.id).select('-password');
    return res.json({ user });

  } catch(error) {
      throw(error);
  }
  
});    

module.exports = router;