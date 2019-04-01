const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

// User Model
const User = require('../../models/User');

// @route   Post api/users
// @desc    Register new user
// @access  Public
router.post('/', (req, res) => {
    const { username, email, password } = req.body;

    if (!username.trim() || !email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields!' });
    }

    if (!(/^[\-0-9a-zA-Z\.\+_]+@[\-0-9a-zA-Z\.\+_]+\.[a-zA-Z]{2,}$/).test(String(email))) {
		return res.status(400).json({ msg: 'Email Invalid!' });
    }
    
    if(password.length < 6) {
        return res.status(400).json({ msg: 'Password must be more then 6 character!' });
    }

    User.findOne({ email })
        .then(user => {
            if(user) return res.status(400).json({ msg: 'User already exists' });

            const newUser = new User ({
                username,
                email,
                password
            });

            // Create salt & hash
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err) throw err;
                    newUser.password = hash;
                    newUser.save()
                        .then(user => {
                            jwt.sign(
                                { id: user.id }, 
                                config.get('jwtSecret'), 
                                { expiresIn: 3600 }, 
                                (err, token) => {
                                    if(err) throw err;
                                    res.json({
                                        token,
                                        user: {
                                            id: user.id,
                                            username: user.username,
                                            email: user.email
                                        }
                                    });
                            });
                        });
                });
            });
        });
});
    

module.exports = router;