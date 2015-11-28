var express    = require('express'),
    bodyParser = require('body-parser'),
    app        = express(),
    port       = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({extended: true}))

app.get('/', function(req, res) {
    res.status(200).send("Hey, you just hit the test route");
});

app.listen(port, function() {
    console.log(port + " is where the magic happens.")
})

app.post('/testss', function(req, res, next) {
    var userName = req.body.username;
    var botPayLoad = {
        text: "Hello " + userName + ". Welcome here."
    };

    if (userName !== 'slackbot') {
        return res.status(200).json(botPayLoad);
    } else {
        return res.status(200).end();
    }
})