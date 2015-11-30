'use strict';
var moment = require('moment');

module.exports = {
    'convertDate': function(dataString) {
        var day = moment(dataString).zone(dataString);
        return day._d;
    }
};