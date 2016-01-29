const express = require('express');
const jsonParser = require('body-parser').json();
const handleDBError = require( __dirname + '/../lib/handle_db_error');


var Pokemon = require( __dirname + "/../models/pokemon" );
var pokeRouter = module.exports = exports = express.Router();

pokeRouter.get('/pokemon' , (req , res) => {
                //Query Here
  Pokemon.find( {} , (err, data) => {
    if (err) return handleDBError(err,res);
    res.status(200).json(data);
  });
});

pokeRouter.post('/pokemon' , jsonParser, (req , res) => {
  var newPoke = new Pokemon(req.body);
  newPoke.save( (err , data) => {
    if (err) return handleDBError(err , res);
    res.status(200).json(data);
  });
});

//These need IDs
pokeRouter.put('/pokemon/:id' , jsonParser,  (req , res) => {
  var pokeData = req.body;
  delete pokeData._id;
  Pokemon.update( {_id: req.params.id}, pokeData , (err , data) => {
    if (err) return handleDBError(err , res);

    res.status(200).json( {msg: 'successful update!'} );
  });
});

pokeRouter.delete('/pokemon/:id' , (req , res) => {
  Pokemon.remove( {_id: req.params.id} , (err) => {
    if (err) return handleDBError(err , res);
    res.status(200).json( {msg: 'Successful delete!'} );
  });
});
