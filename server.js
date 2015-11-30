var express    = require('express'),
    bodyParser = require('body-parser'),
    Slack      = require('slack-client'),
    app        = express(),
    port       = process.env.PORT || 8080
    slackToken = 'xoxb-15507669824-rcZQmawhSTTvYmUw5UfB3W51';
var slack      = new Slack(slackToken, true, true);

app.use(bodyParser.urlencoded({extended: true}))

app.listen(port, function() {
    console.log(port + " is where the magic happens.")
})

require('./controllers/slackbot.login.controller')(slack);
require('./controllers/slackbot.message.controller')(slack);
require('./controllers/app.route.controller')(app)