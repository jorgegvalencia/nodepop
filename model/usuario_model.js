'use strict';

var conn = require('../lib/mongooseManager');
var mongoose = require('mongoose');
var usersCollection = 'users';

var usuarioSchema = mongoose.Schema({
  name: {
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

// Devolver la lista de users
usuarioSchema.statics.list = function (cb, filter) {
  var query = Usuario.find(filter);
  return query.exec(function (err, rows) {
    if (err) {
      return cb(err);
    }

    return cb(null, rows);
  });
};

var Usuario = mongoose.model(usersCollection, usuarioSchema);
