'use strict';

let conn = require('../lib/mongooseManager');
let mongoose = require('mongoose');
let usersCollection = 'usuarios';

let usuarioSchema = mongoose.Schema({
  nombre: String,
  email: String,
  password: String
});

let Usuario = mongoose(usersCollection, usuarioSchema);

// Devolver la lista de usuarios
usuarioSchema.statics.list = function (cb) {
  let query = Usuario.find();
  return query.exec(function (err, rows) {
    if (err) {
      return cb(err);
    }

    return cb(null, rows);
  });
};
