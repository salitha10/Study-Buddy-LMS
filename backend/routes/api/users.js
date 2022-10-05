//Connect to mongo db
const mongoose = require('mongoose');
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');
const express = require('express');  
const router = express.Router();

//Load input validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

// @route   GET api/users/test
// @desc    Tests users route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Users Works' }));

// @route   POST api/users/register
// @desc    Register user
// @access  Public
router.post('/register', (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);
    
    //Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    
    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
        errors.email = 'Email already exists';
        return res.status(400).json(errors);
        } else {
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });
    
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
                .save()
                .then(user => res.json(user))
                .catch(err => console.log(err));
            });
        });
        }
    });
    });

// @route   POST api/users/login
// @desc    Login User / Returning JWT Token
// @access  Public
router.post('/login', (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);
    
    //Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    
    const email = req.body.email;
    const password = req.body.password;
    
    //Find user by email
    User.findOne({ email }).then(user => {
        //Check for user
        if (!user) {
        errors.email = 'User not found';
        return res.status(404).json(errors);
        }
    
        //Check password
        bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
            //User matched
            const payload = { id: user.id, name: user.name }; //Create JWT payload
    
            //Sign token
            jwt.sign(
            payload,
            keys.secretOrKey,
            { expiresIn: 3600 },
            (err, token) => {
                res.json({
                success: true,
                token: 'Bearer ' + token
                });
            }
            );
        } else {
            errors.password = 'Password incorrect';
            return res.status(400).json(errors);
        }
        });
    });
    });

// @route   GET api/users/current
// @desc    Return current user
// @access  Private
router.get(
    '/current',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
        });
    }
    );

//Get all users
router.get('/', (req, res) => {
    User.find()
    .then(users => res.json(users))
    .catch(err => res.status(404).json({ nousersfound: 'No users found' }));
});

module.exports = router;
