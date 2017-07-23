//можно удалить мы это не используем
var mysql = require('mysql');
var config = require('config');
var connection = mysql.createConnection(config.db);
connection.connect();

connection.query('SELECT 1 + 1 AS solution', function (err, rows, fields) {
    if (err) throw err

    console.log('The solution is: ', rows[0].solution)
});

connection.end();
exports.recipes_list=function(req,res,next){
    
};