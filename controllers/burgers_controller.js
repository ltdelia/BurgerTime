var connection = require('../config/connection.js');
var orm = require('../config/orm.js');
var express = require('express');
var app = express();

// Routing

module.exports = function(app){
	app.get('/', function(req, res){
		orm.selectAll('burgers', function(burger_data){
			res.render("index", {burger_data});
		})
	});	
	
	app.get('/api', function(req, res){
		orm.selectAll('burgers', function(burger_data){
			res.json(burger_data);
		});
	});

	app.post('/api', function(req, res){
		var burger = req.body;
		console.log(burger);
		if(burger.burger_name){
			orm.addABurger(burger.burger_name);
		}
		if(burger.id){
			orm.eatABurger(burger.id);
		}
	});
}