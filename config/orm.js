var connection = require('./connection.js');

var orm = {
    selectAll: function(tableInput, cb) {
        var s = 'SELECT * FROM ' + tableInput + ';';
        connection.query(s, function(err, result) {

            console.log(result);

            cb(result);
        });
    },
    addABurger: function(burger_name){
        var s = 'INSERT INTO burgers(burger_name, devoured) VALUES(?, false);';
        connection.query(s, [burger_name], function(err, result) {
 
            console.log(result);
        });        
    },
    eatABurger: function(id){
        var s = 'UPDATE burgers SET devoured=true WHERE id=?;';
        connection.query(s, [id], function(err, result) {
 
            console.log(result);
        });        
    }
};

module.exports = orm;

