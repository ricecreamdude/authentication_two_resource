//Server, runnning ALL the routes and defining mongoDB access

const express = require('express');
const app = module.exports = exports = express();
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/pokemon_app');

const pokeRouter = require( __dirname + '/routes/poke_routes');
const authRouter = require( __dirname + '/routes/auth_routes');

var PORT = process.env.PORT || 3000;

app.use("/api" , pokeRouter);

app.listen(PORT, () => {
  console.log('Server running on port ' + PORT);
});
