const mongoose = require('mongoose');
const Event = require('../models/event')
mongoose.connect('mongodb://localhost:27017/Event', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connetion Succcessful");
    })
    .catch((err) => {
        console.log("OOps there is ann error in connection", err);
    })


const addEvent = async function (value) {
    const event = await Event.findOne({ name: value });
    console.log(event);
}

// addEvent('Freshers')
console.log('hellooo')
console.log(addEvent)