var connection = require('./connection.js');

var readyToEat;
var devoured;

var orm = {
    readyToEat: function(tableInput) {
        var s = 'SELECT * FROM ' + tableInput + ' WHERE devoured=false;';
        connection.query(s, function(err, result) {

            console.log(result);

            readyToEat = result;
        });
    },
    devoured: function(tableInput) {
        var s = 'SELECT * FROM ' + tableInput + ' WHERE devoured=true;';
        connection.query(s, function(err, result) {

            console.log(result);

            devoured = result;
        });
    },    
    addABurger: function(a, b){
        var s = 'INSERT INTO burgers(id, burger_name, devoured) VALUES(?, ?, false);';
        connection.query(s, [a, b], function(err, result) {
 
            console.log(result);
        });        
    },
    eatABurger: function(burger_name){
        var s = 'UPDATE burgers SET devoured=true WHERE burger_name=?;';
        connection.query(s, [burger_name], function(err, result) {
 
            console.log(result);
        });        
    }
};

module.exports = readyToEat;
module.exports = devoured;    
module.exports = orm;

