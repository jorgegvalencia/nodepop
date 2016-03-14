'use strict';

var mongoose = require('mongoose');
// creamos la conexion con la base de datos
var conn = require('../lib/mongooseManager');
var anunciosCollection = 'anuncios';

var anuncioSchema = mongoose.Schema({
  nombre: String,
  venta: Boolean,
  precio: Number,
  foto: String,
  tags: [String]
});

// Devolver la lista de anuncios
// validar campos antes de pasarselo
anuncioSchema.statics.list = function (cb, queryParams, pag) {
  var query = Anuncio.find({});
  var filters = {};
  if( queryParams){
  // Parsear y establecer los parametros de la query
  if (queryParams.tags) {
      // filtrar por tags
      filters.tag = { $in: tags };
  } else if (queryParams.type !== null) {
      // filtrar por sale(true)|search(false)
      // type: { queryParams.type }
  } else if (queryParams.price) {
      // filtrar por precio gte y lte
      // age: { $gt: 30, $lt: 40}
  } else if (queryParams.name) {
      // filtrar por nombre
      // name: { $in: [ 'Jones', 'Brown']}
  } else if (queryParams.sort) {
    // ordenar la query por nombre|precio
    // query.sort('name');
  }

  // Paginacion
  // query.skip(5*(pag-1));
  // query.limit(5);
  }
  return query.exec(function (err, rows) {
    if (err) {
      return cb(err);
    }

    return cb(null, rows);
  });
};

anuncioSchema.statics.findAd = function (cb, id) {
  var query = Anuncio.find({ id: id });
  return query.exec(function (err, rows) {
    if (err) {
      return cb(err);
    }

    return cb(null, rows);
  });
};

var Anuncio = mongoose.model('anuncios', anuncioSchema);
