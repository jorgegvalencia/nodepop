'use strict';

var conn = require('../lib/mongooseManager');
var mongoose = require('mongoose');
var usersCollection = 'usuarios';

var usuarioSchema = mongoose.Schema({
  nombre: {
    type: String,
    trim: true,
    unique: true,
    sparse: true,
    required: true
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    sparse: true,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

// Devolver la lista de usuarios
usuarioSchema.statics.list = function (cb) {
  var query = Usuario.find();
  return query.exec(function (err, rows) {
    if (err) {
      return cb(err);
    }

    return cb(null, rows);
  });
};

var Usuario = mongoose.model(usersCollection, usuarioSchema);
