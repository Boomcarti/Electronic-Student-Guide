 server intitialisation:
 1. create and import server data
 2. modify server access credentials in index.js if nessecary
 3. start te server

 To intitialise the server create a database on the local machine and import the data from the sql dump file

 Commands:

Inport:

 Create database:
 $mysql -u root -p
 enter password, the server assumes user to be 'root' and password to be 'root' if this is not the case you will have to modify the source or else it will not be able to access the database on your machine

 $CREATE DATABASE esgDB;

 import data:
 $mysql -u root -p esgDB < esgDB.sql

 server run command:
 $npm run devStart

Export:

 Create Dump file:
 mysqldump -u root -p esgDB > esgDB.sql
 then enter password "root"
