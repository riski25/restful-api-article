// var mongoose = require('mongoose');
// // mongoose.connect('mongodb://127.0.0.1:27017/securing-rest-apis-with-jwt', { useMongoClient: true });
// mongoose.connect(`mongodb://riski25:2XEFqfBejBacBlxk@cluster0-shard-00-00.rlbgd.mongodb.net:27017,cluster0-shard-00-01.rlbgd.mongodb.net:27017,cluster0-shard-00-02.rlbgd.mongodb.net:27017/mern?ssl=true&replicaSet=atlas-j8oxbl-shard-0&authSource=admin&retryWrites=true&w=majority`);
module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "",
    DB: "db_artikel",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };
  