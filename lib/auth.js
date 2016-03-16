'use strict';

var basicauth = require('basic-auth');
var mongoose = require('mongoose');
var aes256 = require('aes256');
var key = 'cl4V3l4rgac0nNum3rOsyLetR4S';

var User = mongoose.model('usuarios');

var auth = function () {
  return function (req, res, next) {
    var credentials = basicauth(req);
    if (!credentials) {
      res.set('WWW-Authenticate', 'Basic realm=Authorization Required')
      res.send(401);
      return;
    }
    console.log(credentials.name);
    // buscar usuario en la db y su password
    User.list(function (err, rows) {
      if (err) {
        return;
      }
      console.log(rows);
      if (rows.length === 1) {
        if (credentials.pass !== aes256.decrypt(key, rows[0].password)) {
          res.set('WWW-Authenticate', 'Basic realm=Authorization Required')
          res.sendStatus(401);
          return;
        }
        next();
      }
    }, {
      nombre: credentials.name
    })
  };
};



// function validateData(username, password) {
//   // buscar usuario en la db y su password
//   User.list(function (err, rows) {
//     if (err) {
//       return;
//     }
//     console.log(rows);
//     if(rows.length === 1){
//       if(credentials.pass === aes256.decrypt(key,rows[0].password)
//     }
//   }, {nombre: credentials.name})
// }

module.exports = auth;
