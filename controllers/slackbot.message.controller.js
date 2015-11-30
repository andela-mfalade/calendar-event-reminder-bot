'use strict';

var responseFormatter = require('./../response_helpers/slackbot.response.formatter');
var messageCount = 0;

module.exports = function (slack) {
    slack.on('message', function (message) {
        if (message.type === 'message' && message.text && message.username !== "bot") {
            var channel  = slack.getChannelGroupOrDMByID(message.channel),
                user     = slack.getUserByID(message.user);

            var resetMessageCount = function () {
                return messageCount = 0;
            }

            if (channel.name !== 'general') {

                // Send "Do you need help" response to user if user enters random message twice.
                if (messageCount >= 2) {
                    var response = responseFormatter.create_DO_YOU_NEED_HELP_Response();
                    channel.postMessage(response);
                    resetMessageCount();
                }

                if (message.text == 'help') {
                    resetMessageCount();
                    var response = responseFormatter.create_HELP_Response(user.name);
                    channel.postMessage(response);
                }

                if (message.text == 'upcoming') {
                    resetMessageCount();
                    var upcomingCalendarEvents;
                    var getListOfEvents = function(eventsList) {
                        upcomingCalendarEvents = eventsList;
                        var response = responseFormatter.create_UPCOMING_Response(upcomingCalendarEvents);
                        channel.postMessage(response);
                    }
                    require('./google.calendar.api.controller.js')(getListOfEvents);
                }

                else {
                    messageCount += 1;
                }
            }
        }
    });

    slack.on('error', function (error) {
        console.log(error);
    });
}