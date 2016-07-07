Project (vodapplicationtest) for skill test:

# Demo:
1. clone to your computer.
2. cd vodapplicationtest
3. node index.js
4. put http://localhost:3000/ in browser address bar

# initialise MySQL
1. make sure you have installed MySQL 5(+) in your computer
2. login MySQL by command line or GUI tools, but use the user can create database, user and tables
3. execute following SQL

```
CREATE DATABASE vodapp;
CREATE USER 'vodapp'@'localhost' IDENTIFIED BY 'vodapp';
GRANT ALL ON vodapp.* TO 'vodapp'@'localhost';

DROP TABLE IF EXISTS vodapp.history;
CREATE TABLE vodapp.history (
  `id` INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `movie_id` VARCHAR(30) NOT NULL,
  `movie_title` VARCHAR(128) NOT NULL,
  `created` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```
