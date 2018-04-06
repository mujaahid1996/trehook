// custom
var express = require('express'),
    request = require('request'),
    app = express(),
    bodyParser = require('body-parser'),
    //port = process.env.PORT ,
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

    var myListId = '5ac261d92ec3ffbf77aa5c75'; // list muj @ board salinan

    //get card from list
    // trello.getCardsOnList(myListId, function (error, trelloCards) {
    //     if (error) {
    //         console.log('Could not get cards from list ', error);
    //     } else {
    //         var nilaiAwal = JSON.stringify(trelloCards);
    //         // var nilaiFilter = nilaiAwal.substr(1).slice(0, -1);
    //         // console.log('cards from list : \n', JSON.stringify(nilaiFilter.name)  );
    //         console.log('cards from list : \n', nilaiAwal[2].name  );
    //     }
    // });


    var trelloAction = req.body.action.type;

    // console.log("" + JSON.stringify(req.body));
    // console.log("-------------------- \n ");  


    /*
    di board Utama list muj, klo ada card baru
    add card baru juga di list Utama : 5ac261e9f930db25a2103a2e
    */
    // card baru
    if (trelloAction == "createCard" ) {            
        // trace that data
        // console.log("" + JSON.stringify(req.body));
        
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
        
        // validasi berasal dari list muj (utama)
        if (req.body.action.data.list.id == '5ac261e9f930db25a2103a2e' ){
            // add to dest list
            // console.log('berasal dari list muj (utama) !!');           
            trello.addCard(newtitle, description, myListId, function (error, trelloCard) {
                if (error) {
                    console.log('Could not add card:', error);
                } else {
                    console.log('Added card: \n', trelloCard);
                }
            });
        }


    }

    // trace trello action
    // if(trelloAction != "" || trelloAction != null ){
    //     // console.log('ada action baru ' );
    //     console.log("-------------------- ");
    //     console.log(""+JSON.stringify(trelloAction) );
    //     console.log( JSON.stringify(req.body.action.data) );
    // }



    res.send('OK');

});


// Standard NodeJS Listener
var server = app.listen(port, function () {
    var host = "trehook.herokuapp.com"; // custom
    // var host = "trehook.localtunnel.me"; // custom
    var port = server.address().port;

    console.log('Priority Enforcer listening at https://%s:%s in %s', host, port, env);
});