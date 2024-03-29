const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    course_grade: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    course_code: {
        type: String,
        required: true,
        unique: true
    },
    course_image: {
        type: String,
        required: true
    },
    course_videos: {
        type: String,
        required: true
    },
    course_category: {
        type: String,
        required: true
    },
    course_instructor: {
        type: String,
        required: true
    },
    course_students: {
        type: Array,
        required: false
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});


//Export schema
module.exports = mongoose.model('Course', CourseSchema);