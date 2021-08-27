var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
const {check, validationResult} = require('express-validator');
var db = require('../user/index');
var datauser = db.user;
var model_user = db.Sequelize.Op;
var bcrypt = require('bcryptjs');

var VerifyToken = require(__root + 'auth/VerifyToken');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
// var User = require('./User');

// CREATES A NEW USER
// router.post('/', [
//         check('name').not().isEmpty(),
//         check('email').normalizeEmail().isEmail(),
//         check('password').isLength({min:5}) 
//     ] ,(req, res) => {

//     const errors = validationResult(req);
//     console.log(errors);
    
//     if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//     }
//     datauser.create({
//             name : req.body.name,
//             email : req.body.email,
//             password : req.body.password
//         }, 
//         function (err, user) {
//             if (err) return res.status(500).json({ "error": err});
//             res.status(200).json({ "status":"success", "message":"Berhasil Create"});
//         });
// });

// RETURNS ALL THE USERS IN THE DATABASE
router.get('/', VerifyToken, function (req, res) {
    datauser.findAll({}).then((users) => {
        res.status(200).send(users);
    }).catch((err) => {
        if (err) return res.status(500).send("There was a problem finding the users.");
    });
});

// GETS A SINGLE USER FROM THE DATABASE
// router.get('/:id', VerifyToken,function (req, res) {
//     datauser.findByPk(req.params.id).then((user) => {
//         if (!user) return res.status(404).send("No user found.");
//         res.status(200).send(user);
//     }).catch((err) => {
//         if (err) return res.status(500).send(err);
//     }); 
// });

router.get('/:username', VerifyToken,function (req, res) {
    const username = req.params.username;
    var condition = username ? { username: { [model_user.like]: `%${username}%` } } : null;

    datauser.findAll({where: condition}).then((user) => {
        if (!user) return res.status(404).send("No user found.");
        res.status(200).send(user);
    }).catch((err) => {
        if (err) return res.status(500).send("There was a problem finding the user.");
    }); 
});

// DELETES A USER FROM THE DATABASE
router.delete('/:id', VerifyToken,function (req, res) {
    datauser.findByIdAndRemove(req.params.id, function (err, user) {
        if (err) return res.status(500).send("There was a problem deleting the user.");
        res.status(200).send("User: "+ user.name +" was deleted.");
        res.status(200).json({auth:true, message:"User"+ User.name+" deleted"});
    });
});

// UPDATES A SINGLE USER IN THE DATABASE
// Added VerifyToken middleware to make sure only an authenticated user can put to this route
router.put('/data/:id', VerifyToken,  function (req, res) {
    
    if (req.body.password) {
        return res.status(400).json({ "message": "wrong route for change password"});
    }
    if (req.body.email) {
        return res.status(400).json({ "message": "email can't change"});
    }
    datauser.update(req.body, {where: {id:req.params.id}}).then((user) => {
        res.status(200).send({status:"success",update:"update success!"});
    }).catch((err) => {
        if (err) return res.status(500).send("There was a problem updating the user.");        
    })
});
router.put('/password/:id', VerifyToken,  function (req, res) {

    if (req.body.email) {
        return res.status(400).json({ "message": "email can't change"});
    }
    if (req.body.nama) {
        return res.status(400).json({ "message": "wrong route for change nama"});
    }
    if (req.body.username) {
        return res.status(400).json({ "message": "wrong route for change username"});
    }
    if (req.body.alamat) {
        return res.status(400).json({ "message": "wrong route for change alamat"});
    }
    if (req.body.jeniskelamin) {
        return res.status(400).json({ "message": "wrong route for change jenis kelamin"});
    }
    if (req.body.foto) {
        return res.status(400).json({ "message": "wrong route for change foto"});
    }
    if (req.body.akses) {
        return res.status(400).json({ "message": "wrong route for change akses"});
    }

    var hashedPassword = bcrypt.hashSync(req.body.password, 8);

    data = {
        password : hashedPassword,
      }

    datauser.update(data, {where: {id:req.params.id}}).then((user) => {
        res.status(200).send({status:"success",update:"update success!"});
    }).catch((err) => {
        if (err) return res.status(500).send("There was a problem updating the user.");        
    })
});


module.exports = router;