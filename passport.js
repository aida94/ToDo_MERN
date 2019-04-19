const passport = require('passport');
const config = require('config');
const GooglePlusTokenStrategy = require('passport-google-plus-token');
const FacebookTokenStrategy = require('passport-facebook-token');

// User Model
const User = require('./models/User');


//GOOGLE OAUTH STRATEGY
passport.use('googleToken', new GooglePlusTokenStrategy({
  clientID: config.oauth.google.clientID,
  clientSecret: config.oauth.google.clientSecret
}, async (accessToken, refreshToken, profile, done) => {
  try {
    // Check if user with the same google id exists
    const existingUser = await User.findOne({ 'google.id': profile.id });
    // if exist return existinf user
    if (existingUser) {
      return done(null, existingUser);
    }

    // if no, create new one and return new user
    const newUser = new User({
      method: 'google',
      google: {
        id: profile.id,
        username: profile.name.givenName,
        email: profile.emails[0].value
      }
    });

    await newUser.save();
    done(null, newUser);

  } catch(error) {
    done(error, false, error.message);
  }
}));

//FACEBOOK OAUTH STRATEGY
passport.use('facebookToken', new FacebookTokenStrategy({
  clientID: config.oauth.facebook.clientID,
  clientSecret: config.oauth.facebook.clientSecret
}, async (accessToken, refreshToken, profile, done) => {
  try {

    // Check if user with the same facebook id exists
    const existingUser = await User.findOne({ 'facebook.id': profile.id });
    // if exist return existinf user
    if (existingUser) {
      return done(null, existingUser);
    }

    // if no, create new one and return new user
    const newUser = new User({
      method: 'facebook',
      facebook: {
        id: profile.id,
        username: profile.name.givenName,
        email: profile.emails[0].value
      }
    });

    await newUser.save();
    done(null, newUser);

  } catch(error) {
    done(error, false, error.message);
  }
}));



// pass id and key to config