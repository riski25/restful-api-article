// var mongoose = require('mongoose');  
// var UserSchema = new mongoose.Schema({  
//   name: String,
//   email: String,
//   password: String
// });
// mongoose.model('User', UserSchema);

// module.exports = mongoose.model('User');

module.exports = (sequelize, Sequelize) => {
  const users = sequelize.define("users", {
    email: {
      type: Sequelize.STRING
    },
    username: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    nama: {
      type: Sequelize.STRING
    },
    alamat: {
      type: Sequelize.STRING
    },
    jeniskelamin: {
      type: Sequelize.STRING
    },
    foto: {
      type: Sequelize.STRING
    },
    akses: {
      type: Sequelize.STRING
    }


  });

  return users;
};
