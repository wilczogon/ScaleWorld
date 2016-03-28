# ScaleWorld
Just a simple node.js project

# How to start
First download MySQL database from official site.
mysql> CREATE USER 'test'@'localhost' IDENTIFIED BY 'test';
mysql> GRANT ALL PRIVILEGES ON * . * TO 'test'@'localhost';
mysql> FLUSH PRIVILEGES;

Add mysql home directory to PATH. Then:
> mysql -u test -p < db_setup.sql
> mysql -u test -p < example_data.sql

Install Node.js.
Run:
> npm install express
> npm install mustache-express
> npm install mysql
> npm install async-series

Then start your application:
> node app.js

Now, open in your browser following url:
127.0.0.1:8081