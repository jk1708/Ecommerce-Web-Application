var mongoose = require('mongoose');

const validator = require('validator');
const jwt = require('jsonwebtoken');
var bcrypt= require('bcrypt-nodejs');
var Schema= mongoose.Schema;
var userSchema= new Schema( {
  email: {
  type: String,
 required: true,
  trim: true,
  minlength: 1,
  unique: true,
  validate: {
    validator: validator.isEmail,
    message: '{VALUE} is not a valid email'
  }
},
password: {
  type: String,
 required: true,
  minlength: 6
}

});
userSchema.methods.encryptPassword= function(password){
  return bcrypt.hashSync(password, bcrypt.genSaltSync(5),null);
}
userSchema.methods.validPassword=function(password){
  return bcrypt.compareSync(password, this.password);
}
module.exports = mongoose.model('User', userSchema);
