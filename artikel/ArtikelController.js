var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
const {check, validationResult} = require('express-validator');
var db = require('../user/index');
var artikel = db.artikel;
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

// CREATES A NEW USER
router.post('/', VerifyToken, [
        check('title').not().isEmpty(),
        check('description').not().isEmpty(),
        // check('image').not().isEmpty() 
    ] ,(req, res) => {

    const errors = validationResult(req);
    console.log(errors);
    
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    if (req.body.tipe == 'user') {
        return res.status(400).json({ message: "user cannot posted" });
    }

    artikel.create({
            title : req.body.title,
            description : req.body.description,
            image : req.body.image
        }).then((result) => {
            res.status(200).json({ "status":"success", "message":"Berhasil Create","id":result.id,"judul":req.body.title});
        }).catch((err) => {
            if (err) return res.status(500).json({ "error": err});
        }); 
});
// router.post("/upload", controller.upload);
router.post('/uploud/', uploadImg ,(req, res) => {
    if (req.body.tipe == 'user') {
        return res.status(400).json({ message: "user cannot posted" });
    }
    data = {
        image : req.file.filename,
    }
    artikel.update(data, {where: {id:req.body.id}}).then((result) => {
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

// RETURNS ALL THE USERS IN THE DATABASE
router.get('/', VerifyToken, function (req, res) {
    artikel.findAll({}).then((users) => {
        res.status(200).send(users);
    }).catch((err) => {
        if (err) return res.status(500).send("There was a problem finding the users.");
    });
});

// GETS A SINGLE USER FROM THE DATABASE
router.get('/:id', VerifyToken,function (req, res) {
    artikel.findByPk(req.params.id).then((user) => {
        if (!user) return res.status(404).send("No user found.");
        res.status(200).send(user);
    }).catch((err) => {
        if (err) return res.status(500).send(err);
    }); 
});

// router.get('/:username', VerifyToken,function (req, res) {
//     const username = req.params.username;
//     var condition = username ? { username: { [model_user.like]: `%${username}%` } } : null;

//     artikel.findAll({where: condition}).then((user) => {
//         if (!user) return res.status(404).send("No user found.");
//         res.status(200).send(user);
//     }).catch((err) => {
//         if (err) return res.status(500).send("There was a problem finding the user.");
//     }); 
// });

// DELETES A USER FROM THE DATABASE
router.delete('/:id', VerifyToken,function (req, res) {
    if (req.body.tipe == 'user') {
        return res.status(400).json({ message: "user cannot posted" });
    }
    artikel.destroy( {where: { id: req.params.id }}).then((result) => {
        res.status(200).json({auth:true, message:"article deleted"});
    }).catch((err) => {
        if (err) return res.status(500).send("There was a problem deleting artikel.");
    });
});

// UPDATES A SINGLE USER IN THE DATABASE
// Added VerifyToken middleware to make sure only an authenticated user can put to this route
router.put('/edit/:id', VerifyToken,  function (req, res) {
    if (req.body.tipe == 'user') {
        return res.status(400).json({ message: "user cannot posted" });
    }
    
    artikel.update(req.body, {where: {id:req.params.id}}).then((user) => {
        res.status(200).send({status:"success",update:"update success!"});
    }).catch((err) => {
        if (err) return res.status(500).send("There was a problem updating the user.");        
    })
});


module.exports = router;