var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
const {check, validationResult} = require('express-validator');
var db = require('../user/index');
var datauser = db.user;
var model_user = db.Sequelize.Op;
var bcrypt = require('bcryptjs');
const multer = require('multer');

var VerifyToken = require(__root + 'auth/VerifyToken');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
// var User = require('./User');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploud');
      },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const uploadImg = multer({storage: storage}).single('image');

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
router.post('/uploud', uploadImg ,(req, res) => {
    data = {
        image : req.file.filename,
    }
    datauser.update(data, {where: {id:req.body.id}}).then((result) => {
            if(!req.file) {
                res.status(500);
                return next(err);
              }
              console.log(result);
              
            res.status(200).json({ "status":"success", "message":"uploud success" });
            // res.status(200).json({ "status":"success", "message":"Berhasil Create","id":result.id,"judul":req.body.title});
        }).catch((err) => {
            if (err) return res.status(500).json({ "error": err});
        }); 
    });


module.exports = router;