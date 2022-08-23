const mongoose = require('mongoose');



const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        // required: true,
    },
    word_date: {
        type: String,
        // required:true,
    },
    start_time: {
        type: String,
        // required: true
    },
    end_time: {
        type: String,
        // required: true
    },
    start_date: {
        type: Number,
        // required: true,
    },
    end_date: {
        type: Number,
        // required: true,
    }

})
module.exports = new mongoose.model('Event', eventSchema);

