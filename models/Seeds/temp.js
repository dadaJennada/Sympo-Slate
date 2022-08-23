function formatting(dateString) {
    i = 0;
    let month = '';
    let day = '';
    let year = '';
    let date = dateString.split('/');
    day = parseInt(date[0]);
    month = parseInt(date[1]) + 1;
    year = parseInt(date[2]);
    return date;
    // console.log(`${month}/${day}/${year}`);
    // const edate = new Date(`${month}/${day}/${year}`);
    // return edate
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
    // if()
    const AP = string.slice(5);
    if (AP === 'PM') {
        hours = parseInt(hours) + 12;
    }
    return [hours, parseInt(mins)];

}


module.exports.timeSplit = timeSplit

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
