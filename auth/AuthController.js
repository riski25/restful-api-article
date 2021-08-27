var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var db = require('../user/index');
var datauser = db.user;
var model_user = db.Sequelize.Op;

var VerifyToken = require('./VerifyToken');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());


/**
 * Configure JWT
 */
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var bcrypt = require('bcryptjs');
var config = require('../config'); // get config file

router.post('/login', function(req, res) {
  const email = req.body.email;
  var condition = email ? { email: { [model_user.like]: `%${email}%` } } : null;
  console.log(email);
  
  datauser.findOne({ where: { email: email } }).then(user =>{
    console.log('tes');
    
    if (!user) return res.status(404).send("No user found.");
    // check if the password is valid
    console.log(user);
    
    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordIsValid) return res.status(401).send({ auth: false, message: "wrong password !",token: null });

    // if user is found and password is valid
    // create a token
    var token = jwt.sign({ id: user.id }, config.secret, {
      // expiresIn: 86400 // expires in 24 hours
      expiresIn: '1h' // expires in 24 hours
    });

    // return the information including token as JSON
    res.status(200).send({ auth: true, id: user.id, token: token });

  }).catch(err =>{
    if (err) return res.status(500).send(err );
  }) 
});

router.get('/logout', function(req, res) {
  res.status(200).send({ auth: false, message:"Logout success",token: null });
});

router.post('/register', function(req, res) {

  var hashedPassword = bcrypt.hashSync(req.body.password, 8);

  datauser.create({
    email : req.body.email,
    username : req.body.username,
    password : hashedPassword,
    nama  : req.body.nama,
    alamat  : req.body.alamat,
    jeniskelamin  : req.body.jeniskelamin,
    foto  : req.body.foto,
    akses:req.body.akses

  }).then(user => {
    // if user is registered without errors
    // create a token
    var token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: '1h' // expires in 24 hours
    })

    res.status(200).send({ auth: true, id: user.id, token: token});
  }).catch(err => {
    if (err) return res.status(500).send("There was a problem registering the user`.")
  });

});

// router.get('/auth-user/:id', VerifyToken, function(req, res, next) {

//   datauser.findById(req.params.id, { password: 0 }, function (err, user) {
//     if (err) return res.status(500).send("There was a problem finding the user.");
//     if (!user) return res.status(404).send("No user found.");
//     res.status(200).send(user);
//   });

// });

module.exports = router;