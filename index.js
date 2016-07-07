var express = require('express');
var bodyParser = require("body-parser");
var mysql = require('mysql');
var app = express();
var htdocRoot = __dirname + '/htdoc/';

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var mysql_conn = connectToMySQL();

// add path
app.use("/libs", express.static(__dirname + '/libs'));
app.use("/asserts", express.static(__dirname + '/asserts'));
app.use("/component", express.static(htdocRoot + '/component'));

// routing
app.get('/', function (req, res) {
  res.sendFile(htdocRoot + 'index.html');
});

app.get('/get-history', function(req, res) {
  var queryInsert = "SELECT * FROM history ORDER BY created desc limit 5";

  mysql_conn.query(queryInsert, function(err, rows, fields) {

    if (!err){
      res.send(rows);
    } else {
      console.log('Error while performing Query.');
      console.log(err);
    }
  });
});

app.post('/save-history', function (req, res) {
  var movie = req.body.params;
  var movieId = movie.id;
  var movieTitle = movie.title;

  var queryInsert = "INSERT INTO history (movie_id, movie_title) values('" + movieId + "', '" + movieTitle + "')";

  // try to select
  mysql_conn.query(queryInsert, function(err, rows, fields) {
    if (err) {
      console.log('Error while performing Query.');
      console.log(err);
    }
  });
});

// listen port
app.listen(3000, function () {
  console.log('vodApplication listening on port 3000!');
});

////////// functions

function connectToMySQL(){
  var connection = mysql.createConnection({
    host     : '127.0.0.1',
    user     : 'vodapp',
    password : 'vodapp',
    database : 'vodapp'
  });

  // connect test
  connection.connect(function(err){
    if(!err) {
        console.log("Database is connected ... nn");
    } else {
        console.log("Error connecting database ... nn");
    }
  });

  return connection;
}

////////// MySQL SQL
/*
CREATE DATABASE vodapp;

CREATE USER 'vodapp'@'127.0.0.1' IDENTIFIED BY 'vodapp';
CREATE USER 'vodapp'@'localhost' IDENTIFIED BY 'vodapp';

GRANT ALL ON vodapp.* TO 'vodapp'@'127.0.0.1';
GRANT ALL ON vodapp.* TO 'vodapp'@'localhost';

DROP TABLE IF EXISTS vodapp.history;
CREATE TABLE vodapp.history (
  `id` INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `movie_id` VARCHAR(30) NOT NULL,
  `movie_title` VARCHAR(128) NOT NULL,
  `created` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
*/
