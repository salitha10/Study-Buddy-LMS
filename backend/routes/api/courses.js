//Connect to mongo db
const mongoose = require('mongoose');
const course = require('../../models/Course');
const express = require('express');  
const router = express.Router();
var bodyParser = require('body-parser')

// @route   GET api/course
// @desc    Tests course route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Course Works' }));

// @route   POST api/course/register
// @desc    Register course
// @access  Public
router.post('/',(req, res) => {
    console.log(req.body);
    const newCourse = new course({
        name: req.body.name,
        course_grade: req.body.course_grade,
        description: req.body.description,
        course_code: req.body.course_code,
        course_image: req.body.course_image,
        course_videos: req.body.course_videos,
        course_category: req.body.course_category,
        course_instructor: req.body.course_instructor,
        course_students: req.body.course_students
    });

    newCourse
        .save()
        .then(course => res.json(course))
        .catch(err => console.log(err));
    });


//Update specific course
router.put('/:code', (req, res) => {
    console.log(req.body);
    //Find by course code and update
    course.findOneAndUpdate({course_code: req.params.code}, req.body, {new: true}, (err, course) => {
        if (err) {
            return res.status(500).send(err);
        }
        return res.send(course);
    });
});


//Get all courses
router.get('/all', (req, res) => {
    course.find()
        .then(courses => res.json(courses))
        .catch(err => res.status(404).json({ nocoursesfound: 'No courses found' }));
    });

//Get course by id
router.get('/:code', (req, res) => {
    course.findOne({ course_code: req.params.code })
        .then(course => res.json(course))
        .catch(err => res.status(404).json({ nocoursefound: 'No course found' }));
    });

//Delete course by id
router.delete('/:code', (req, res) => {
    //Find by couse code and remove
    course.findOneAndRemove({ course_code: req.params.code })
        .then(course => res.json(course))
        .catch(err => res.status(404).json({ nocoursefound: 'No course found' }));
    });

module.exports = router;