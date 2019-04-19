const express = require('express');
const passport = require('passport');
const router = express.Router();  // use express-promise-router if you want to ride of try catch
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');
const passportConf = require('../../passport');

// User Model
const User = require('../../models/User');
const passportGoogle = passport.authenticate('googleToken', { session: false });
const passportFacebook = passport.authenticate('facebookToken', { session: false });


// @route   Post api/auth/google
// @desc    Google Oauth
// @access  Public
router.post('/google', passportGoogle, async (req, res, next) => {
  // Generate token
  const token = jwt.sign({ id: req.user.id }, config.get('jwtSecret'), { expiresIn: 3600 });
  return res.json({ token, user: req.user.google});
});


// @route   Post api/auth/facebook
// @desc    Facebook Oauth
// @access  Public
router.post('/facebook', passportFacebook, async (req, res, next) => {
  // Generate token
  const token = jwt.sign({ id: req.user.id }, config.get('jwtSecret'), { expiresIn: 3600 });
  return res.json({ token, user: req.user.facebook});
});


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
    const user = await User.findOne({ 'local.email': email });
    if (!user) {
      return res.status(400).json({msg: 'User does not exist'})
    }
    const comparePassword = await bcrypt.compare(password, user.local.password);
    if (!comparePassword) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user.id }, config.get('jwtSecret'), { expiresIn: 3600 });
    return res.json({ token, user: user.local });

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
    const user = await User.findOne({ 'local.email': email });
    if (user) {
      return res.status(400).json({ msg: 'User already exist' });
    }
    const salt = await bcrypt.genSalt(10); // generate salt
    const encryptedPassword = await bcrypt.hash(password, salt); // generate hash password

    // create user in db
    const newUser = await User.create({ 
      method: 'local', 
      local: {
        username,
        email,
        password: encryptedPassword
      }
    });

    const token = jwt.sign({ id: newUser.id }, config.get('jwtSecret'), { expiresIn: 3600 });
    return res.json({ token, user: newUser.local });

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