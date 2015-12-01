'use strict';
var moment = require('moment');

module.exports = {
    'convertDate': function(dataString) {
        var day = new Date(dataString);
        return day;
    }, 

    'subtractTenMinutes': function (eventDate) {
        var moment = require("moment");
        var eventTime = new Date(eventDate),
            startTime = new Date(eventTime),
            durationInMinutes = 10;
        var reminderTime = new Date(startTime.setMinutes(eventTime.getMinutes() - durationInMinutes));
        return reminderTime;
    }
};