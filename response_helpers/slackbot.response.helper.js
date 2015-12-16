'use strict';

var responseMsg = {};
var coolBarColors = ['#439FE0', '#7CD197', '#9B59B6', '#E67E22', '#34495E', '#DB0A5B', '#674172', '#F5D76E'];
var dateParser = require('./time.helper');

// Response for when a user sends the keyword "help" to tweetbo 
responseMsg.create_HELP_Response = function(username) {
    return {
        "attachments": [
            {
                "fallback": "Hi " + username + ". \n- Below is a list of Cool bot commands.\n \n",
                "text": "`help`: To show the help menu. \n\n  `upcoming`: To view the next 5 upcoming events \n\n",
                "mrkdwn": true,
                "mrkdwn_in": ["text", "pretext"],
                "color": "#7CD197"
            }
        ]
    };
};

responseMsg.create_REMINDER = function (event_summary, eventTime) {
    return {
        "attachments": [
            {
                "fallback": "`Upcoming Event`: " + "*" + event_summary + "*" + ". \n\n `Time`: " + eventTime,
                "text": "`Upcoming Event`: " + "*" + event_summary + "*" + ". \n\n `Time`: " + eventTime,
                "mrkdwn": true,
                "mrkdwn_in": ["text", "pretext"],
                "color": "#9B59B6"
            }
        ]
    };
};

responseMsg.create_DO_YOU_NEED_HELP_Response = function() {
    return {
        "attachments": [
            {
                "fallback": "Do you need some help? Send `help` To show the help menu.",
                "text": "Do you need some help? Send `help` to show the help menu.",
                "mrkdwn": true,
                "mrkdwn_in": ["text", "pretext"],
                "color": "#7CD197"
            }
        ]
    };
};

// Response for when a user sends the keyword "upcoming" to bot
responseMsg.create_UPCOMING_Response = function(events) {
    var attachmentsArray = [{ "title": "Your Upcoming Events."}];
    events.map(function(event) {
        var eventDate = dateParser.convertDate(event.start_time);
        attachmentsArray.push(
            {
                "fallback": event.event_summary,
                "text": eventDate + " -> " + event.event_summary,
                "color": coolBarColors[Math.floor(Math.random() * 8)]
            }
        )
    });
    return { "attachments": attachmentsArray };
};

responseMsg.create_INVALID_ENTRY_response = function () {
    var attachmentsArray = [{ 
        "title": "Oops, that command is not recognised! :stuck_out_tongue_winking_eye:", 
        "text": "Send `help` to Cool-Bot to get a list of available commands",
        "color": coolBarColors[Math.floor(Math.random() * 8)],
        "thumb_url": '',
        "mrkdwn": true,
        "mrkdwn_in": ["text", "pretext"]
    }];
    return { "attachments": attachmentsArray };
}

// Export the method that creates the bot response
module.exports = responseMsg;
