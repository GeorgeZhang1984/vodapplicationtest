Project (vodapplicationtest) for skill test:

# Demo:
1. clone to your computer.
2. `cd vodapplicationtest`
3. `node index.js`
4. put `http://localhost:3000/` in browser address bar

# Initialise MySQL (optional, for saving watch history)
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

# Question
1.	Describe the data you would capture as part of this service.

2.	How would make this service more efficient?
  - use database connect pool, return the cost of connecting db
  - use CDN cash accelerate video playing speed
  - get history from cookies, but still post data to server, in case user disabled cookies
  - retrieve hot video and put them in memory speed access
  - use new video format, less storage but better quality
3.	Once the feature is complete, how would you know that it’s ready for go-live?
  - the feature should be well-developed and test by developer
  - the code has to pass all unit test (organised by Grunt or Gulp) on both font-end and back-end 
  - the feature has to pass the functionality test, which means it actual match all requirements
  - the code then has to pass CR by other teammates or other group
  - if above all good, then it ready for go-live
4.	How would you determine if this feature is successful?
  - if this feature be completed as time & under budget
  - if the feature satisfied by all teammates
  - if the feature satisfied by the client, I think this the most important factor
  - if the feature affect (or break) others, shouldn't cause more bugs or hard to maintain
