// custom
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

app.all("", function (req, res, next) {

    var trelloAction = req.body.action.type;

    console.log("" + JSON.stringify(req.body));
    console.log("-------------------- \n ");  

    // card baru
    if (trelloAction == "createCard" ) {            
        console.log("" + JSON.stringify(req.body));
        
        console.log("-------------------- \n ");               
        console.log("ada deskripsi baru");
        console.log("-------------------- ");
        var titleCard = JSON.stringify(req.body.action.data.card.name);
        var titleBoard = JSON.stringify(req.body.action.data.board.name);
        console.log(titleCard);
        console.log(titleBoard);
        console.log("-------------------- ");
    }

    if(trelloAction != "" || trelloAction != null ){
        console.log(""+JSON.stringify(trelloAction) );
        console.log( JSON.stringify(req.body.action.data) );
    }

    res.send('OK');

});


// Standard NodeJS Listener
var server = app.listen(port, function () {
    var host = "18f524de.ngrok.io"; // custom
    // var host = "trehook.localtunnel.me"; // custom
    var port = server.address().port;

    console.log('Priority Enforcer listening at http://%s:%s in %s', host, port, env);
});