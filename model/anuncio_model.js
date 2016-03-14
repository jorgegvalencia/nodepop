'use strict';

// creamos la conexion con la base de datos
let conn = require('../lib/mongooseManager');
let mongoose = require('mongoose');
let anunciosCollection = 'anuncios';

let anuncioSchema = mongoose.Schema({
  nombre: String,
  venta: Boolean,
  precio: Number,
  foto: String,
  tags: [String]
});

let Anuncio = mongoose.model(anunciosCollection, anunciosSchema);

// Devolver la lista de anuncios
// validar campos antes de pasarselo
anuncioSchema.statics.list = function (cb, queryParams, pag) {
  let query = Anuncio.find({});

  // Parsear y establecer los parametros de la query
  if (queryParams.tags) {
      // filtrar por tags
      // tag: { $in: tags}
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
  return query.exec(function (err, rows) {
    if (err) {
      return cb(err);
    }

    return cb(null, rows);
  });
};

anuncioSchema.statics.findAd = function (cb, id) {
  let query = Anuncio.find({ id: id });
  return query.exec(function (err, rows) {
    if (err) {
      return cb(err);
    }

    return cb(null, rows);
  });
};
