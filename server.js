var app = require('./app');
var port = process.env.PORT || 3000;
const mongoose = require('mongoose');


const db = require("./user/index");

db.sequelize.sync();


app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});


// mongoose.connect(
//   `mongodb://riski25:2XEFqfBejBacBlxk@cluster0-shard-00-00.rlbgd.mongodb.net:27017,cluster0-shard-00-01.rlbgd.mongodb.net:27017,cluster0-shard-00-02.rlbgd.mongodb.net:27017/mern?ssl=true&replicaSet=atlas-j8oxbl-shard-0&authSource=admin&retryWrites=true&w=majority`
// ).then( ()=>{
//   app.listen(port, () => {
//     console.log('Running port 3000');
//   });
// }).catch(err => {
//   console.log(err);
// });