'use strict';


module.exports =  function (app) {
    app.get('/', function(req, res) {
        res.status(200).send("Hey, you just hit the test route");
    });

    app.post('/hello', function(req, res, next) {
        var userName = req.body.user_name;
        var botPayLoad = {
            text: "Hello " + userName + ". Welcome here."
        };

        if (userName !== 'slackbot') {
            return res.status(200).json(botPayLoad);
        } else {
            return res.status(200).end();
        }
    })
}