var express = require('express'),
    request = require('request'),
    app = express(),
    bodyParser = require('body-parser'),
    port = process.env.PORT || 8829,
    env = process.env.NODE_ENV || 'development',
    key = "805b2290e31d0da7cc708cd6cc3b1ec5",
    token = "acffb162bfe3d95886eb82a119fcf4a23353c6c01620d3a0280d221e0a29ff95";


// Allows us to easily read the payload from the webhook
app.use(bodyParser.json());

// Only act when a specific route is called
// This reduces malicious / accidental use
app.all("", function (req, res, next) {

    var trelloAction = req.body.action.type;

    if (trelloAction == "commentCard") {            
            console.log("" + JSON.stringify(req.body));
        console.log("-------------------- \n ");
        console.log("" + req.body.action.data.text);        
        console.log("ada komentar baru");
        console.log("-------------------- ");
    }


    if (req.body.action.type === 'updateCard' ) {
        console.log("-------------------- \n ");
        console.log("card updated");
        console.log("-------------------- ");
    }
    res.send('OK');
});


// Standard NodeJS Listener
var server = app.listen(port, function () {
    var host = "7310e838.ngrok.io";
    var port = server.address().port;

    console.log('Priority Enforcer listening at http://%s:%s in %s', host, port, env);
});