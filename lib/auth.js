'use strict';

let basicauth = require('basic-auth');
let mongoose = require('mongoose');
let utils = require('./utils');

let crypto = require('crypto');
let key = 'cl4V3l4rgac0nNum3rOsyLetR4S';

let User = mongoose.model('usuarios');

let auth = function () {
  return function (req, res, next) {
    let credentials = basicauth(req);
    if (!credentials) {
      res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
      res.status(400).json({ result: false, error: 'Missing username and/or password.' });
      return;
    }

    // buscar usuario en la db y su password
    User.list(function (err, rows) {
      if (err) {
        return res.status(503).json({ result: false, error: utils.dbErrorResponse(err) });
      }

      if (rows.length === 1) {
        let credentialpass = crypto.createHmac('sha256', key)
            .update(credentials.pass)
            .digest('hex');
        if (credentialpass !== rows[0].password) {
          res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
          res.status(404).json({ result: false, error: 'Wrong password.' });
          return;
        }

        next();
      }

      return res.status(404).json({ result: false, error: 'User does not exist.' });
    }, { nombre: credentials.name });
  };
};

module.exports = auth;
