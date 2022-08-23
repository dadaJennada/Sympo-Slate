const mongoose = require('mongoose');
const Event = require('./event')
const { Schema } = mongoose;

const studentSchema = new Schema({
    name: {
        type: String,
    },
    register_id: {
        type: String,
    },
    mail: {
        type: String,
    },
    username: {
        type: String,
    },
    password: {
        type: String,
    },
    events: [{
        type: Schema.Types.ObjectId,
        ref: 'Event',
    }],
});

module.exports = new mongoose.model('Student', studentSchema);

