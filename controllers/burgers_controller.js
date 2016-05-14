var connection = require('../config/connection.js');
var orm = require('../config/orm.js');
var express = require('express');
var app = express();

// Routing

module.exports = function(app){
	app.get('/index', function(req, res){
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
		var newBurger = req.body;
		console.log(newBurger);
		orm.addABurger(newBurger.burger_name);
	});

	app.put('/api', function(req, res){
		orm.eatABurger(req.body.burger_name, function(result){
			res.redirect('/');
		});
	});
}