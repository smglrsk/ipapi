Geolocation API based on ipstack


Requirements
Node
Express
MongoDB


Installation
npm install
npm start


This app is a simple REST API backed by MongoDB database that requires JWT authorization. The application is be able to store geolocation data in the database, based on IP address or URL 

First of all replace MONDODB_URL and IPSTACK_ACCESS_KEY (you can get it for free from https://ipstack.com/signup/free )  with yours.
As a MongoDB you can use MongoDB Atlas.

The app uses two models:  User and IP.

The list of routes:
Method :  POST       Path:   /users     JSON parameters:  name, email, password (used for the registration of a new user)
Method :  POST       Path:   /users/login     JSON parameters:   email, password (returns JWT token)

Method :  POST       Path:   /ip     JSON parameters:  ip       (requires the authentication)
In the background it feeds the rest of data from ipstack.com  for a given IP or URL.

Method :  DELETE       Path:   /ip     JSON parameters:  ip       (requires the authentication)
Method :  GET       Path:   /ip     JSON parameters:  ip       (requires the authentication)

The login return a  JWT token  which should be attached in the Authorization  parameters as Bearer Token.









