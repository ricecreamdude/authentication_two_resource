const mongoose = require('mongoose');

var pokeSchema = new mongoose.Schema({
  name: {type: String , default: 'Pidgey'},
  type: {type: String , default: 'Normal'},
  level: {type: Number , default: 1 }
});

module.exports = exports = mongoose.model('Pokemon' , pokeSchema);
