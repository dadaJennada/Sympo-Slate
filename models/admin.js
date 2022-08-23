const mongoose = require('mongoose');


const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    register_id: {
        type: String,
        required: true,
    },
    mail: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: [true, 'Username is required'],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    }
});

module.exports = new mongoose.model('Admin', adminSchema);