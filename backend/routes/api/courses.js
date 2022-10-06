//Connect to mongo db
const mongoose = require('mongoose');
const course = require('../../models/Course');
const express = require('express');  
const router = express.Router();

// @route   GET api/course
// @desc    Tests course route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Course Works' }));

// @route   POST api/course/register
// @desc    Register course
// @access  Public
router.post('/register', (req, res) => {
    const newCourse = new course({
        name: req.body.name,
        description: req.body.description,
        course_code: req.body.course_code,
        course_image: req.body.course_image,
        course_video: req.body.course_video,
        course_price: req.body.course_price,
        course_duration: req.body.course_duration,
        course_level: req.body.course_level,
        course_category: req.body.course_category,
        course_instructor: req.body.course_instructor,
        course_students: req.body.course_students
    });

    newCourse
        .save()
        .then(course => res.json(course))
        .catch(err => console.log(err));
    });


//Edit course
router.post('/edit', (req, res) => {
    const newCourse = new course({
        name: req.body.name,
        description: req.body.description,
        course_code: req.body.course_code,
        course_image: req.body.course_image,
        course_video: req.body.course_video,
        course_price: req.body.course_price,
        course_duration: req.body.course_duration,
        course_level: req.body.course_level,
        course_category: req.body.course_category,
        course_instructor: req.body.course_instructor,
        course_students: req.body.course_students
    });

    newCourse
        .save()
        .then(course => res.json(course))
        .catch(err => console.log(err));
    });

//Get all courses
router.get('/all', (req, res) => {
    course.find()
        .then(courses => res.json(courses))
        .catch(err => res.status(404).json({ nocoursesfound: 'No courses found' }));
    });

//Get course by id
router.get('/:id', (req, res) => {
    course.findById(req.params.id)
        .then(course => res.json(course))
        .catch(err => res.status(404).json({ nocoursefound: 'No course found' }));
    });

//Delete course by id
router.delete('/:id', (req, res) => {
    course.findByIdAndRemove(req.params.id)
        .then(course => res.json(course))
        .catch(err => res.status(404).json({ nocoursefound: 'No course found' }));
    });

module.exports = router;