var CronJob = require('cron').CronJob;
var responseFormatter = require('./../response_helpers/slackbot.response.helper');
var timeHelper = require('./../response_helpers/time.helper');

module.exports = {
    createReminder: function(event, channel) {
        var reminderTime = timeHelper.subtractTenMinutes(event.start_time);
        var eventTime =  timeHelper.convertDate(event.start_time);
        var reminderMessage = responseFormatter.create_REMINDER(event.event_summary, eventTime)
        var job = new CronJob(new Date(reminderTime), function() {
                /* runs once at the specified date. */
                channel.postMessage(reminderMessage);
            }, 
            function () {
                /* This function is executed when the job stops */
                console.log("Done running cron job")
            },
            true /* Start the job right now */
        );
    }
};
