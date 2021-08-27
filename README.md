
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
```
$ node --version
v10.16.2
```
```
$ npm --version
6.9.0
```
## Application Structure
* server.js - This file defines our express server.
* config.js - This file defines secret code for JWT Token.
* app.js - This file defines route end point API
* auth/ - This folder contains the REST authentication for login API.
* user/ - This folder contains the RESTful API user.
* artikel/ - Thid folder contain Rest API controller article

## API Endpoints

### REGISTER USER EXAMPLE

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
    "email" : "example@gmail.com",
    "username":"contohuser",
    "password":"contohpassword",
    "nama":"userbaru",
    "alamat":"contohalamat",
    "jeniskelamin":"L", -> OPTION L(laki)/P(perempuan)
    "foto":"img.jpg",
    "akses":"user" -> OPTION admin/user
}
```

### LOGIN USER EXAMPLE
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

### GET USER EXAMPLE
```
'Headers': x-access-token: [YOUR TOKEN FROM LOGIN}
'Content-Type: application/json'
```
Method :
```
GET     http://localhost:3000/api/users/:id
```
### GET USER by username EXAMPLE
```
'Headers': x-access-token: [YOUR TOKEN FROM LOGIN}
'Content-Type: application/json'
```
Method :
```
GET     http://localhost:3000/api/users/:username
```

### CHANGE USER PASSWORD EXAMPLE
```
'Headers': x-access-token: [YOUR TOKEN FROM LOGIN}
'Content-Type: application/json'
```
Method :
```
PUT     http://localhost:3000/api/user/password/:id
```

Body Request :
```
{
    "password":"new password",
}
```
### CREATE ARTICLE EXAMPLE
```
'Headers': x-access-token: [YOUR TOKEN FROM LOGIN}
'Content-Type: application/json'
```
Method :
```
POST     http://localhost:3000/api/article
```

Body Request :
```
{
    "title":"new article",
    "description":"new article",
    "image":"img-article",
    "tipe":"admin"
}
```
### GET ARTICLE PAGE EXAMPLE
```
'Headers': x-access-token: [YOUR TOKEN FROM LOGIN}
'Content-Type: application/json'
```
Method :
```
GET     http://localhost:3000/api/article/
```
### DELETE ARTICLE EXAMPLE
```
'Headers': x-access-token: [YOUR TOKEN FROM LOGIN}
'Content-Type: application/json'
```
Method :
```
DELETE     http://localhost:3000/api/article/:id
```

Body Request :
```
{
    "tipe":"admin"
}
```
### EDIT ARTICLE EXAMPLE
```
'Headers': x-access-token: [YOUR TOKEN FROM LOGIN}
'Content-Type: application/json'
```
Method :
```
PUT     http://localhost:3000/api/article/edit/:id
```

Body Request :
```
{
    "title":"new article",
    "description":"new article",
    "image":"img-article",
    "tipe":"admin"
}
```

### GET ARTICLE by ID EXAMPLE
```
'Headers': x-access-token: [YOUR TOKEN FROM LOGIN}
'Content-Type: application/json'
```
Method :
```
GET     http://localhost:3000/api/article/:id
```
### UPLOUD IMAGE ARTICLE EXAMPLE
```
'Headers': x-access-token: [YOUR TOKEN FROM LOGIN}
'Content-Type: multipart/form-data'
```
Method :
```
POST     http://localhost:3000/api/article/uploud
```

Body Request :
```
{
    "image":"new password",
}
```
### LOOGUT USER EXAMPLE

Method :
```
GET     http://localhost:3000/api/auth/logout
```
