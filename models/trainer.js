const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

var trainerSchema = new mongoose.Schema({
  name: {type: String , default: 'Ash'},
  badge: {type: Number , default: 1},
  hometown: {type: String, default: 'Pallet Town'},
  authentication: {
    email: String,
    password: String
  }
});

//mongoose.Schema.methods.hashPassword =>
trainerSchema.methods.hashPassword = function(password) {
  var hash = this.authentication.password = bcrypt.hashSync(password , 8);
  return hash;
};

trainerSchema.methods.compareHash = function(password) {
  return bcrypt.compareSync( password , this.authentication.password );
};

trainerSchema.methods.generateToken = function() {
  return jwt.sign( {id: this._id}, process.env.APP_SECRET || 'changethis' );
};

module.exports = exports = mongoose.model('Trainer' , trainerSchema);
