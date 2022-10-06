const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
    name: {
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
    course_video: {
        type: String,
        required: true
    },
    course_price: {
        type: Number,
        required: true
    },
    course_duration: {
        type: Number,
        required: true
    },
    course_level: {
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
