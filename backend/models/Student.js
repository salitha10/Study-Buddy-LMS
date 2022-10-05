const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profile_picture: {
        type: String,
        unique: true
    },
    date_of_birth: {
        type: Date,
        required: false
    },
    location:{
        type: String,
        required: true
    },
    phone_number: {
        type: String,
        required: true
    },
    registration_number: {
        type: String,
        required: true
    },
    courses: {
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

