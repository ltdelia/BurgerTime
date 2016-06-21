# BurgerTime
Create and devour burgers. Uses MySQL database, Express routing, Handlebars view engine, and Node.

# Introduction

BurgerTime is a Node app that utilizes MySQL, Express, and Handlebars. It allows a user to order a burger, then choose a burger to devour from the "Ready to Eat" section. Once a burger is devoured, it appears in the "Devoured" section.

# Installation

To install, first clone the repo to a location on your computer. Then run:

```npm install```

This installs the following dependencies:

```
  "dependencies": {
    "body-parser": "^1.15.0",
    "express": "^4.13.4",
    "express-handlebars": "^3.0.0",
    "handlebars": "^4.0.5",
    "method-override": "^2.3.5",
    "mysql": "^2.10.2"
  }
```

From here, navigate to the config folder, and open `connection.js`. Once inside make sure to change the user and password inside the connection variable.

```
var connection = mysql.createConnection({
    port: 3306,
    host: 'localhost',
    user: 'nodeuser',
    password: 'nodepassword',
    database: 'burgers_db'
});

```

Open your SQL client, and run the following commands, found in `schema.sql` (inside the db folder):

```
create database burgers_db;
use burgers_db;

CREATE TABLE burgers(
  id int AUTO_INCREMENT NOT NULL,
  burger_name varchar(100),
  devoured boolean,
  date TIMESTAMP,
  PRIMARY KEY (id)
)
```

This will create your local instance of `burgers_db`, as well as the table `burgers`. 

You can then run the optional command (found in `seeds.sql`) to insert five burgers into `burgers`. 

```
INSERT INTO burgers(burger_name, devoured)
    VALUES
      ("Cheeseburger", true),
      ("Hamburger", false),
      ("Mushroom Burger", false),
      ("Veggie Burger", false),
      ("Philly Burger", false);
```

# The ORM

BurgerTime uses an ORM to execute various SQL queries as needed by the application. 

The ORM (`orm.js`) can be broken down into three used methods:

`selectAll`, which shows the entire table:

```
    selectAll: function(tableInput, cb) {
        var s = 'SELECT * FROM ' + tableInput + ';';
        connection.query(s, function(err, result) {

            console.log(result);

            cb(result);
        });
    },
```

`addABurger`, which inserts a burger into the table:

```
    addABurger: function(burger_name){
        var s = 'INSERT INTO burgers(burger_name, devoured) VALUES(?, false);';
        connection.query(s, [burger_name], function(err, result) {
 
            console.log(result);
        });        
    },
```

`eatABurger`, which sets devoured=true based on the respective id of the burger in the table:

```
    eatABurger: function(id){
        var s = 'UPDATE burgers SET devoured=true WHERE id=?;';
        connection.query(s, [id], function(err, result) {
 
            console.log(result);
        });        
    }
```

# Code Walkthrough

BurgerTime uses routing with Express. Routes are defined explicitly in `burgers_controller.js`. The app uses three particular routes:

1. A get route for `/`, rendering the home page. `orm.selectAll()` is run here. 
2. A get route for `/api`, which displays a JSON of the database. `orm.selectAll()` is also run here.
3. A post route for `/api`, which handles adding and updating the database. `orm.addABurger()` and `orm.eatABurger()` are both run, depending on the request sent from `index.handlebars`.

When the server is initialized, `index.handlebars` is rendered. The page contains three areas of interest to the user:

1. An input to enter/order a burger.
2. A "Ready to Eat" section, displaying burgers available to devour.
3. A "Devoured" section, displaying the devoured burgers.

The input in the first column has an `id` `newBurger`, whose value is grabbed once a user clicks the "Order this burger!" button (which has the `id` `order`). A post request  is sent to `/api`, containing the user input.  

The following click event is executed:

```
$("#order").on('click', function(){
	
	var burger = {burger_name: $('#newBurger').val().trim()};

	var currentURL = window.location.origin;

	$.post(currentURL + '/api', burger)
		.done(function(data){
			console.log(data);
		})

	return false;
});
```

The post route in `burgers_controller.js` handles how the request will be treated. Since this request is sent as an object (`burger`) containing the value (`burger_name`), the following logic is run: 

```
		if(burger.burger_name){
			orm.addABurger(burger.burger_name);
		}
```

The "Ready to Eat" section displays the table (`burger_data`), excluding any rows where `"devoured=true"`. Each row displays the `id` and `burger_name` of each burger, with a button that has the `id` of the burger.

```
<tbody>
	{{#each burger_data}}
		{{#if this.devoured}}
		{{else}}
			<tr>
				<td>{{this.id}}</td>
				<td value={{this.burger_name}}>{{this.burger_name}}</td>
				<td><button id={{this.id}} type="submit" class="devour">Devour it!</button></td>
			</tr>
		{{/if}}
	{{/each}}
</tbody>
```

When a user clicks the "Devour It!" button, the following click event is executed: 

```
$(".devour").on('click', function(){

	var burger = {id: event.target.id};

	var currentURL = window.location.origin;

	$.post(currentURL + '/api', burger)
		.done(function(data){
			console.log(data);
		})

	return false;
})
```

Since this request is sent as an object (`burger`) containing the value (`id`), the following logic is run:

```
		if(burger.id){
			orm.eatABurger(burger.id);
		}
```

The "Devoured" section displays any rows where `"devoured=true"`.

```
<tbody>
	{{#each burger_data}}
		{{#if this.devoured}}
			<tr>
				<td>{{this.id}}</td>
				<td>{{this.burger_name}}</td>
			</tr>
		{{/if}}
	{{/each}}
</tbody>
```

# Running

To initialize the server and run the application, run the following command:

```
node server.js
```

Enjoy!