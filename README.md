
# NodeJS RESTFUL api

 RESTFUL api for NodeJS. Project smple API have register function with hashing of passwords encryption dan login with JWT auth.
 have function create, edit, delete article

## Requirements development
1. Node global package
2. mySQL

## Installation
* Clone the repo by using ```git clone```.
* Run ```npm install``` on the cloned directory.
* Run ```npm start ``` OR ```npm run dev ```

## Running tested 
installation was successful on environment :
$ node --version
v10.16.2

$ npm --version
6.9.0

## Application Structure
* server.js - This file defines our express server and connects it to MongoDB using mongoose setting.
* config.js - This file defines secret code for JWT Token.
* app.js - This file defines route end point API
* auth/ - This folder contains the REST authentication for login API.
* user/ - This folder contains the RESTful API user.

## API Endpoints

REGISTER EXAMPLE

```
'Content-Type: application/json'
```
Method :
```
POST    http://localhost:3000/api/auth/register/
```
body Request :

```
{
    "name" : yourname,
    "email" : your@email.com,
    "password" : yourpass
}
```

LOGIN EXAMPLE
```
'Content-Type: application/json'
```

Method :
```
POST    http://localhost:3000/api/auth/login/
```

body Request :

```
{
    "email" : your@email.com,
    "password" : yourpass
}
```

GET USER EXAMPLE
```
'Headers': x-access-token: [YOUR TOKEN FROM LOGIN}
'Content-Type: application/json'
```
Method :
```
GET     http://localhost:3000/api/users/:id
```

LOOGUT USER EXAMPLE

Method :
```
GET     http://localhost:3000/api/auth/logout
```
