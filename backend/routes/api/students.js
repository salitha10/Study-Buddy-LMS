//Connect to mongo db
const mongoose = require('mongoose');
const student = require('../../models/Student');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');
const express = require('express');  
const router = express.Router();

//Load input validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

// @route   GET api/student
// @desc    Tests student route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Student Works' }));

// @route   POST api/student/register
// @desc    Register student
// @access  Public

router.post('/register', (req, res) => {
    console.log(req.body);
    student.findOne({ email: req.body.email }).then(user => {
        if (user) {
        return res.status(400).json({msg: 'Email already exists'});
        } else {
        const newUser = new student({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            profile_picture: req.body.profile_picture,
            date_of_birth: req.body.date_of_birth,
            address: req.body.address,
            phone_number: req.body.phone_number,
            registration_number: req.body.registration_number,
            courses: req.body.courses
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

// @route   POST api/student/login
// @desc    Login student / Returning JWT Token
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
    student.findOne({ email }).then(user => {
        //Check for user
        if (!user) {
        errors.email = 'User not found';
        return res.status(404).json(errors);
        }
    
        //Check password
        bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
            //User matched
    
            const payload = { id: user.id, name: user.name }; //Create JWT Payload
    
            //Sign Token
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

// @route   GET api/student/current
// @desc    Return current student
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

//Get all students
router.get('/all', (req, res) => {
    student.find()
    .then(students => res.json(students))
    .catch(err => res.status(404).json({ nostudentsfound: 'No students found' }));
});

module.exports = router;