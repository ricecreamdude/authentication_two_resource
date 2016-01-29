//Middleware for authorizing clients via jsonwebtoken module

const Trainer = require( __dirname + '/../models/trainer');
const jwt = require('jsonwebtoken');

module.exports = exports = function( req , res , next) {
  var decoded;
  try {
    decoded = jwt.verify(req.headers.token , process.env.APP_SECRET || 'changethis');
  } catch(e) {
    debugger;
    return res.status(401).json( {msg: 'JWT says error while verifying token'} );
  }
  Trainer.findOne( {_id: decoded.id} , (err , user) => {
    if (err) {
      console.log(err);
      return res.status(401).json( {msg: 'JWT says error while finding user.'} );
    }

    if (!user) return res.status(401).json( {msg: 'JWT says this user does not exist'} );

    req.user = user;
    next();
  });
};
