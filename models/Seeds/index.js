const Event = require('../event');
const mongoose = require('mongoose');
const Student = require('../student');
const bcrypt = require('bcrypt');
// const { timeSplit } = require('./temp');

mongoose.connect('mongodb://localhost:27017/Event', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connetion Succcessful");
    })
    .catch((err) => {
        console.log("OOps there is ann error in connection", err);
    })

function formatting(dateString) {
    i = 0;
    let month = '';
    let day = '';
    let year = '';
    let date = dateString.split('/');
    day = date[0];
    month = parseInt(date[1]);
    year = date[2];
    console.log(`${month}/${day}/${year}`);
    const edate = new Date(`${month}/${day}/${year}`);
    return [day, month, year];
}
function timeSplit(string) {
    hours = "";
    mins = "";
    i = 0;
    while (i < 2) {
        hours += string[i];
        i += 1;
    }
    i += 1;
    while (i < 5) {
        mins += string[i];
        i += 1;
    }
    const AP = string.slice(5);
    if (AP === 'PM') {
        hours = parseInt(hours) + 12;
    }
    return [hours, parseInt(mins)];

}





const saveEvent = async function (evnt) {
    await Event.deleteMany({});
    const events = await Event.insertMany([{
        name: 'WorkShop',
        image: '',
        description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Suscipit unde optio nostrum iure sequi, temporibus itaque possimus. Nesciunt quam id sunt minus ex, nostrum voluptatem, quis doloribus, aut omnis consequuntur.',
        word_date: '12/01/2022',
        start_time: '10:00AM',
        end_time: '12:00PM',
        start_date: (new Date(formatting('12/01/2022')[2], formatting('12/01/2022')[1], formatting('12/01/2022')[0], timeSplit('10:00AM')[1], timeSplit('10:00AM')[0])).getTime(),
        end_date: (new Date(formatting('12/01/2022')[2], formatting('12/01/2022')[1], formatting('12/01/2022')[0], timeSplit("12:00PM")[1], timeSplit('12:00PM')[0])).getTime(),
    },
    {
        name: "Muzicanza",
        image: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fG11c2ljfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
        description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Suscipit unde optio nostrum iure sequi, temporibus itaque possimus. Nesciunt quam id sunt minus ex, nostrum voluptatem, quis doloribus, aut omnis consequuntur.',
        word_date: '08/08/2023',
        start_time: '11:00AM',
        end_time: '02:00PM',
        start_date: (new Date(formatting('08/08/2023')[2], (formatting('08/08/2023')[1]), formatting('08/08/2023')[0], timeSplit('11:00AM')[1], timeSplit('11:00AM')[0])).getTime(),
        end_date: (new Date(formatting('08/08/2023')[2], (formatting('08/08/2023')[1]), formatting('08/08/2023')[0], timeSplit("02:00PM")[1], timeSplit('02:00PM')[0])).getTime(),
    },
    {
        name: "Sizzles",
        image: 'https://media.istockphoto.com/photos/at-home-three-joyfuls-sports-fans-with-painted-faces-sitting-on-a-picture-id1327459066?b=1&k=20&m=1327459066&s=170667a&w=0&h=Uir0WW9eR2JrxaLJXBnJ6IU0v5Rq1t7Wrzp_NYlcDMU=',
        description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Suscipit unde optio nostrum iure sequi, temporibus itaque possimus. Nesciunt quam id sunt minus ex, nostrum voluptatem, quis doloribus, aut omnis consequuntur.',
        word_date: '08/08/2021',
        start_time: '11:00AM',
        end_time: '02:00PM',
        start_date: (new Date(formatting('08/08/2021')[2], (formatting('08/08/2021')[1]), formatting('08/08/2021')[0], timeSplit('11:00AM')[1], timeSplit('11:00AM')[0])).getTime(),
        end_date: (new Date(formatting('08/08/2021')[2], (formatting('08/08/2021')[1]), formatting('08/08/2021')[0], timeSplit("02:00PM")[1], timeSplit('02:00PM')[0])).getTime(),
    },
        evnt,
        // {
        //     name: "Freshers",
        //     description: "An intro celebrations for 1st Year students",
        //     image: 'https://images.unsplash.com/photo-1517263904808-5dc91e3e7044?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGZyZXNoZXJzJTIwcGFydHl8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
        //     word_date: '09/11/2023',
        //     start_time: '06:00PM',
        //     end_time: '11:00PM',
        //     start_date: (new Date(formatting('09/11/2023')[2], (formatting('09/11/2023')[1]), formatting('09/11/2023')[0], timeSplit('09:00PM')[1], timeSplit('09:00PM')[0])).getTime(),
        //     end_dat-e: (new Date(formatting('09/11/2023')[2], (formatting('09/11/2023')[1]), formatting('09/11/2023')[0], timeSplit("11:00PM")[1], timeSplit('11:00PM')[0])).getTime(),
        // }
    ])
}


const evnt = Event({
    name: "Freshers",
    description: "An intro celebrations for 1st Year students",
    image: 'https://images.unsplash.com/photo-1517263904808-5dc91e3e7044?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGZyZXNoZXJzJTIwcGFydHl8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
    word_date: '09/11/2023',
    start_time: '06:00PM',
    end_time: '11:00PM',
    start_date: (new Date(formatting('09/11/2023')[2], (formatting('09/11/2023')[1]), formatting('09/11/2023')[0], timeSplit('09:00PM')[1], timeSplit('09:00PM')[0])).getTime(),
    end_date: (new Date(formatting('09/11/2023')[2], (formatting('09/11/2023')[1]), formatting('09/11/2023')[0], timeSplit("11:00PM")[1], timeSplit('11:00PM')[0])).getTime(),
})
// console.log(evnt.start_date, "Hiii")


// saveEvent(evnt);
// time1 = '01:00PM';
// time2 = '03:00PM';
// const yesterday = '18/05/2021';
// const varble = new Date(formatting(yesterday)[2], formatting(yesterday)[1], formatting(yesterday)[0], timeSplit(time1)[1], timeSplit(time1)[0]);
// console.log(varble.getTime(), 'newcheck');
const saveStudent = async function (evnt) {
    await Student.deleteMany({});
    const student = new Student({
        name: 'Dada Jennada',
        register_id: '19-1216',
        mail: 'dadakhalandarj@gmail.com',
        username: 'jdk',
        password: await bcrypt.hash('2001', 12),
        events: [],
    });
    // student.events.push(evnt);
    const stud = await student.save();
    console.log(stud);
}
saveStudent(evnt);