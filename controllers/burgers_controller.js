var connection = require('../config/connection.js');
var orm = require('../config/orm.js');
var express = require('express');
var app = express();

// Routing

var readyToEat;
var devoured;

module.exports = function(app){
	app.get('/index', function(req, res){
		orm.readyToEat('burgers');
		orm.devoured('burgers');
		res.render('index', {id: 1, burger_name: "Cheeseburger"});
	});	

	app.get('/api/readytoeat', function(req, res){
		orm.readyToEat('burgers');
		res.json(readyToEat);
	})
}