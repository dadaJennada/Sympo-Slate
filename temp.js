function formatting(dateString) {
    i = 0;
    let month = '';
    let day = '';
    let year = '';
    let date = dateString.split('/');
    day = parseInt(date[0]);
    month = parseInt(date[1]) - 1;
    year = parseInt(date[2]);
    // console.log(`${month}/${day}/${year}`);
    // const edate = new Date(`${month}/${day}/${year}`);
    return [day, month, year];
}


function dateConv(dateText) {
    console.log(dateText, typeof dateText);
    let temp = dateText.split('-');
    let newDate = temp[2] + '/' + temp[1] + '/' + temp[0];
    console.log(newDate);
    return newDate;
}

function backDate(dateText) {
    let temp = dateText.split('/');
    return temp[2] + '-' + temp[1] + '-' + temp[0];
}


function timeConvrsion(time) {
    let dh = time.split(':');
    let hours = parseInt(dh[0]);
    let mins = dh[1];
    if (hours > 12) {
        hours -= 12;
        if (hours < 10) {
            return "0" + hours + ":" + mins + "PM";
        }
        else {
            return hours + ":" + mins + "PM";
        }
    }
    else if (hours == 12) {
        return hours + ":" + mins + 'PM';
    }
    else if (hours < 1) {
        return "00:" + mins + "AM"
    }
    else if (hours < 10) {
        return "0" + hours + ":" + mins + "AM";
    }
    return hours + ":" + mins + "AM";
}

function backTime(time) {
    let hours = "";
    let mins = "";
    for (i = 0; i < 2; i++) {
        hours += time[i];
    }
    for (i = 3; i < 5; i++) {
        mins += time[i];
    }
    let AP = time.slice(5);
    if (AP == 'PM') {
        if (hours == 12) {
            return hours + ':' + mins
        }
        else {
            hours = parseInt(hours) + 12
            return hours + ':' + mins;
        }
    }
    else {
        return hours + ":" + mins;
    }
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
    // if():
    const AP = string.slice(5);
    if (AP === 'PM') {
        if (hours == 12) {
            hours = parseInt(hours)
        }
        hours = parseInt(hours) + 12;
    }
    return [parseInt(hours), parseInt(mins)];

}

// let t = timeConvrsion('15:23');
// console.log(t);
// let bt = backTime('00:00AM');
// console.log(bt);

// const dt = backDate('08/08/2022');
// console.log(dt);
// const word_date = '09/11/2023';
// const start_time = '09:00PM';
// const end_time = '11:00PM';
// const start_date = (new Date(formatting(word_date)[2], (formatting(word_date)[1]), formatting(word_date)[0], timeSplit(start_time)[1], timeSplit(start_time)[0])).getTime();
// const end_date = (new Date(formatting(word_date)[2], (formatting(word_date)[1]), formatting(word_date)[0], timeSplit(end_time)[1], timeSplit(end_time)[0])).getTime();
// console.log(start_date);
// console.log(end_date);
exports.formatting = formatting;
exports.timeSplit = timeSplit;
exports.dateConv = dateConv;
exports.timeConvrsion = timeConvrsion;
exports.backDate = backDate;
exports.backTime = backTime;
// const time = timeSplit("12:00PM");
// console.log(time[0]);
// console.log(time[1]);
// const date = formatting('gexvchVCH');
// console.log(date);
// console.log(date.getMonth());
// var today = new Date();
// var dd = String(today.getDate()).padStart(2, '0');
// console.log(dd);
// const date1 = new Date('December 17, 1995 03:24:00');
// // Sun Dec 17 1995 03:24:00 GMT...

// const date2 = new Date('1995-12-17T03:24:00');
// // Sun Dec 17 1995 03:24:00 GMT...

// console.log(date1 === date2);
// // expected output: false;

// console.log(date1 - date2);
// // expected output: 0
