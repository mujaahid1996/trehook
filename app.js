// custom
var express = require('express'),
    request = require('request'),
    app = express(),
    bodyParser = require('body-parser'),
    // port = process.env.PORT ,
    port = process.env.PORT || 8829,
    env = process.env.NODE_ENV || 'development',
    key = "805b2290e31d0da7cc708cd6cc3b1ec5",
    token = "acffb162bfe3d95886eb82a119fcf4a23353c6c01620d3a0280d221e0a29ff95";

var Trello = require("trello");
var trello = new Trello(key, token);

// check via browser
app.get('/', (req, res) => res.send('app.js is running'));

// Allows us to easily read the payload from the webhook
app.use(bodyParser.json());

// detect action and trigger  
app.all("/", function (req, res, next) {

    var trelloAction = req.body.action.type;

    console.log("" + JSON.stringify(req.body));
    console.log("-------------------- \n ");  

    /*
    di board Utama list saya, klo ada card baru
    add card baru juga di list Utama : 5aa17052cbdf4f3d7149efc5
    */

    // card baru
    if (trelloAction == "createCard" ) {            
        console.log("" + JSON.stringify(req.body));
        
        console.log("-------------------- \n ");               
        console.log("ada card baru");
        console.log("-------------------- ");
        var titleCard = JSON.stringify(req.body.action.data.card.name);
        var titleBoard = JSON.stringify(req.body.action.data.board.name);
        console.log(titleCard);
        console.log(titleBoard);
        console.log("-------------------- ");

        // add new card w/ npm trello
        var newtitle = req.body.action.data.card.name;
        var description = '';
        var myListId = "5aa17052cbdf4f3d7149efc5"; // list Utama
        trello.addCard(newtitle, description, myListId, function (error, trelloCard) {
            if (error) {
                console.log('Could not add card:', error);
            } else {
                console.log('Added card: \n', trelloCard);
            }
        });

    }

    // trace trello action
    if(trelloAction != "" || trelloAction != null ){
        console.log(""+JSON.stringify(trelloAction) );
        console.log( JSON.stringify(req.body.action.data) );
    }

    res.send('OK');

});


// Standard NodeJS Listener
var server = app.listen(port, function () {
    var host = "trehook.herokuapp.com"; // custom
    // var host = "trehook.localtunnel.me"; // custom
    var port = server.address().port;

    console.log('Priority Enforcer listening at https://%s:%s in %s', host, port, env);
});