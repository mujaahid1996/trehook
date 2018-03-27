 var myAppKey = "805b2290e31d0da7cc708cd6cc3b1ec5";
 var myToken = "acffb162bfe3d95886eb82a119fcf4a23353c6c01620d3a0280d221e0a29ff95";
 
 var Trello = require("trello");
 var trello = new Trello(myAppKey, myToken);

 var myListId = "5aa17052cbdf4f3d7149efc5"; // list Utama

 /*
 // add new card
 trello.addCard('Clean car', 'Wax on, wax off', myListId, function(error, trelloCard) {
     if (error) {
         console.log('Could not add card:', error);
     } else {
         console.log('Added card:', trelloCard);
     }
 });
*/

// get existing card
 trello.getCardsOnList(myListId, function(error, res) {
     if (error) {
         console.log('Could not add card:', error);
     } else {
         console.log("ada data dari list: Utama ", res);
     }
 });