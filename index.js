const express = require('express');
const mongoose = require('mongoose');
const path = require('path')
const bcrypt = require('bcrypt');
const flash = require('connect-flash');
const emailValidator = require('deep-email-validator');
const functions = require('./temp.js');
const methodOvveride = require('method-override');
const session = require('express-session');
const formatting = functions.formatting;
const timeSplit = functions.timeSplit;
const dateConv = functions.dateConv;
const timeConvrsion = functions.timeConvrsion;
const backDate = functions.backDate;
const backTime = functions.backTime;
const app = express();
const Event = require('./models/event')
const Admin = require('./models/admin');
const Student = require('./models/student.js');
mongoose.connect('mongodb://localhost:27017/Event', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connetion Succcessful");
    })
    .catch((err) => {
        console.log("OOps there is ann error in connection", err);
    })
app.use(methodOvveride('_method'))
app.set('view engine', 'ejs')

app.use(session({ secret: 'symposlate', resave: false, saveUninitialized: false }));
app.use(express.static(path.join(__dirname, '/root')));
app.use(express.urlencoded({ extended: true }));
app.use(flash());

app.set('views', path.join(__dirname, '/views'));
// app.set('views', 'views');
app.listen(3000, (req, res) => {
    console.log('Opened in 3000');
})



app.get('/login', (req, res) => {
    res.render('login', { messages: req.flash('error'), message2: req.flash('error2'), message3: flash('error3') });
})

app.post('/registered', async (req, res) => {
    const { name, mail, register_id, username, password } = req.body;
    console.log('Hiii');
    const stud = await Student.findOne({ username });
    // if (!name || !mail || !register_id || !username || !password) {
    //     req.flash('error2', 'All Fields are required');
    //     res.redirect('/login');
    // }
    // else 
    if (stud) {
        req.flash('error3', 'Username already used');
        res.redirect('/login');
    }
    else {
        // console.log('HMMMM')
        if (!emailValidator.validate(mail)) {
            res.redirect('/login');
        }
        const dpassword = await bcrypt.hash(password, 12);
        const student = new Student({ name, mail, register_id, username, password: dpassword });
        console.log(student);
        await student.save();
        req.session.logged = true;
        req.session.name = student.username;
        res.redirect('/student/home',);
    }
})

app.post('/logged', async (req, res) => {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username });
    console.log(admin);
    if (!admin) {
        const student = await Student.findOne({ username })
        if (!student) {
            req.flash('error', 'Invalid Username or password')
            res.redirect('/login')
        }
        else {
            const valid = await bcrypt.compare(password, student.password);
            console.log(valid);
            if (!valid) {
                req.flash('error', 'Invalid Username or password')
                res.redirect('/login')
            }
            else {
                req.session.logged = true;
                req.session.name = student.username;
                res.redirect('/student/home');
            }
        }
    }
    else {
        const valid = await bcrypt.compare(password, admin.password);
        console.log(valid);
        if (!valid) {
            req.flash('error', 'Invalid Username or password')
            res.redirect('/login')
        }
        else {
            req.session.logged = true;
            req.session.name = admin.username;
            res.redirect('/home');
        }
    }
})

app.get('/logout', (req, res) => {
    // req.session.name = undefined;
    req.session.destroy();
    res.redirect('/login');
})


app.get('/edit', (req, res) => {
    if (!req.session.logged) {
        res.redirect('/login');
    }
    res.render('edit');
})


app.get('/home', async (req, res) => {
    if (!req.session.logged) {
        res.redirect('/login');
    }
    const events = await Event.find();
    const admin = await Admin.findOne({ username: req.session.name })
    const username = admin.username;
    // console.log(events)
    if (!(events.length)) {
        res.render('empty', { username });
    }
    const timenow = Date.now();
    console.log(timenow, typeof timenow);
    console.log('check')
    res.render('home', { events, timenow, username });
})


app.get('/home/:id', async (req, res) => {
    if (!req.session.logged) {
        res.redirect('/login');
    }
    const username = req.session.name;
    const { id } = req.params;
    console.log(id);
    const event = await Event.findById(id);
    console.log(event);
    let date = backDate(event.word_date);
    let s_time = backTime(event.start_time);
    let e_time = backTime(event.end_time);
    res.render('edit', { event, date, s_time, e_time, username });
})


app.put('/update/:id', async (req, res) => {
    if (!req.session.logged) {
        res.redirect('/login');
    }
    const { id } = req.params;
    // console.log(id);
    let event = await Event.findById(id);
    let { name, description, image, word_date, start_time, end_time } = req.body;
    word_date = dateConv(String(word_date));
    start_time = timeConvrsion(String(start_time));
    end_time = timeConvrsion(String(end_time));
    const st_date = new Date(formatting(word_date)[2], (formatting(word_date)[1]), formatting(word_date)[0], timeSplit(start_time)[0], timeSplit(start_time)[1]);
    const e_date = new Date(formatting(word_date)[2], (formatting(word_date)[1]), formatting(word_date)[0], timeSplit(end_time)[0], timeSplit(end_time)[1]);
    event = { name, description, image, word_date, start_time, end_time, start_date: st_date.getTime(), end_date: e_date.getTime() }
    // console.log(event);
    const evnt = await Event.findByIdAndUpdate(id, event)
    res.redirect('/home');
})

app.get('/new', (req, res) => {
    if (!req.session.logged) {
        res.redirect('/login');
    }
    const username = req.session.name;
    res.render('new', { username, message: req.flash('error') });
})

app.post('/new', async (req, res) => {
    let { name, description, image, word_date, start_time, end_time } = req.body;
    if (!name || !description || !image || !word_date || !start_time || !end_time) {
        req.flash('error', 'All fields are required')
        res.redirect('/new');
    }
    word_date = dateConv(String(word_date));
    start_time = timeConvrsion(String(start_time));
    end_time = timeConvrsion(String(end_time));
    const st_date = new Date(formatting(word_date)[2], (formatting(word_date)[1]), formatting(word_date)[0], timeSplit(start_time)[0], timeSplit(start_time)[1]);
    const e_date = new Date(formatting(word_date)[2], (formatting(word_date)[1]), formatting(word_date)[0], timeSplit(end_time)[0], timeSplit(end_time)[1]);
    const event = new Event({ name, description, image, word_date, start_time, end_time, start_date: st_date.getTime(), end_date: e_date.getTime() });
    await event.save();
    res.redirect('/home');
})

app.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;
    await Event.deleteOne({ _id: id });
    res.redirect('/home');
})



app.get('/student/mycalender', async (req, res) => {
    if (req.session.logged == false) {
        res.redirect('/login')
    }
    const username = req.session.name;
    const student = await Student.findOne({ username }).populate('events')
    if (!(student.events.length)) {
        res.render('mycalender', { username })
    }
    else {
        const events = student.events;
        const timenow = Date.now();
        // console.log(events);
        res.render('mycalenderItems', { events, timenow, username })
    }
    // res.render('mycalender')
})


app.get('/student/home', async (req, res) => {
    if (req.session.logged == false) {
        res.redirect('/login')
    }
    console.log(req.session.logged)
    const events = await Event.find();
    const student = await Student.findOne({ username: req.session.name }).populate('events');
    const username = req.session.name;
    // console.log(events);
    if (!events) {
        res.render('studHome', { username });
    }
    else {
        const studEvents = student.events;
        // console.log("events", events)
        // console.log('studEvents', studEvents);
        const timenow = Date.now();
        let check = 0;
        res.render('studHomeItems', { events, timenow, studEvents, check, username });
    }
})

app.get('/studcalender/:name', async (req, res) => {
    if (!req.session.logged) {
        res.redirect('/login')
    }
    const { name } = req.params;
    const event = await Event.findOne({ name });
    // console.log(event);
    const student = await Student.findOne({ username: req.session.name });
    // console.log(student);
    student.events.push(event);
    await student.save();
    //  console.log(student);
    res.redirect('/student/home');
})

app.get('/stud/remitem/:name', async (req, res) => {
    if (!req.session.logged) {
        res.redirect('/login')
    }
    const { name } = req.params;
    const username = req.session.name;
    // console.log(username);
    const student = await Student.findOne({ username }).populate('events');
    const sevents = student.events;
    let i = 0;

    while (i < sevents.length) {
        // console.log(i);
        // console.log(sevents[i].name, name)
        let name1 = sevents[i].name
        let name2 = name
        if (name1 == name2) {
            break;
        }
        i += 1
    }

    // console.log(student)
    // console.log(sevents)
    // console.log("hiii", sevents[i], i)
    sevents.splice(i, 1);
    student.events = sevents;
    await student.save();
    // console.log(sevents)
    res.redirect('/student/mycalender');
})
