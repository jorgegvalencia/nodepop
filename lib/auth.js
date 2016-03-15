'use strict';

var basicauth = require('basic-auth');
var mongoose = require('mongoose');

var User = mongoose.model('usuarios');

var auth = function (username, pass) {
  return function (req, res, next) {
    var user = basicauth(req);
    console.log('user', user);

    // buscar usuario en la db y su password
    User.list(function (err, rows) {
      if (err) {
          console.log(err);

          // Devolver el json con el error
          res.json({ result: false, err: err });
          console.log('Devolviendo error');
          return;
      }
      else if (!user || user.name !== username || user.pass !== pass) {
          res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
          res.send(401);
          return;
      }
      else{

      }
      console.log('Devolviendo lista de anuncios');

      // return;

    }
    ,{ name: user })
    next();
  };
};

module.exports = auth;
