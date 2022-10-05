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
    const { errors, isValid } = validateRegisterInput(req.body);
    
    //Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    
    student.findOne({ email: req.body.email }).then(user => {
        if (user) {
        errors.email = 'Email already exists';
        return res.status(400).json(errors);
        } else {
        const newUser = new student({
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
    }