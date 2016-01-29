const express = require('express');
const jsonParser = require('body-parser').json();
const handleDBError = require( __dirname + '/../lib/handle_db_error');
const basicHTTP = require( __dirname + '/../lib/basic_http');

const Trainer = require( __dirname + '/../models/trainer');

var authRouter = module.exports = exports = express.Router();

authRouter.post("/signup" , jsonParser, (req , res) => {
  var newTrainer = new Trainer();
  if ( !( (req.body.email || '').length && (req.body.password || '').length > 7) ) {
    return res.status(400).json( {msg: 'Invalid username or password.'});
  }
  newTrainer.username = req.body.username || req.body.email;
  newTrainer.authentication.email = req.body.email;
  newTrainer.hashPassword(req.body.password);
  newTrainer.save( (err , data) => {
    if (err) return handleDBError (err , res);
    res.status(200).json( {token: data.generateToken()} );
  });
});

authRouter.get("/signin" , basicHTTP, (req , res) => {
  Trainer.findOne( {'authentication.email': req.basicHTTP.email}, (err , user) => {

    if (err) {
      console.log(err);
      return res.status(401).json( {msg: 'Authenticat nuuuuuu'});
    }
    if (!user) return res.status(401).json( {msg: 'Authenitcat says no user!'});

    if (!user.comparePassword(req.basicHTTP.password)) return res.status(401).json( {msg: 'authenticat says wrong passowrd!'});

    res.json( {token: user.generateToken()});

  });
});
