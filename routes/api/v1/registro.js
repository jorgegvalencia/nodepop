'use strict';

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var aes256 = require('aes256');

var User = mongoose.model('usuarios');

var key = 'cl4V3l4rgac0nNum3rOsyLetR4S';

router.post('/', function (req, res) {
  // validacion de campos del registro
  var userdata = {
    nombre: req.body.nombre,
    email: req.body.email,
    password: aes256.encrypt(key, req.body.password)
  };
  var usuario = new User(userdata);
  usuario.save(function (err, created) {
    if (err) {
      res.json({ result: false, err: err });
      return;
    }

    res.json({ result: true, row: created });
  });
});

module.exports = router;
