var mysql = require('mysql');

var source = {
    
    localhost:{
        port: 3306,
        host: 'localhost',
        user: 'nodeuser',
        password: 'nodepassword',
        database: 'burgers_db'
    },

    jawsDB: {
        port: 3306,
        host: 'q3vtafztappqbpzn.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
        user: 'q10g6s5tcpomffs3',
        password: 'x3t06pilkid76na6',
        database: 's5wr4v8odi6ygjxe'
    }

};

var connection = mysql.createConnection({
    port: source.jawsDB.port,
    host: source.jawsDB.host,
    user: source.jawsDB.user,
    password: source.jawsDB.password,
    database: source.jawsDB.database
});


connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connected as id ' + connection.threadId);
});

module.exports = connection;