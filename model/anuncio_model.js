'use strict';

var mongoose = require('mongoose');

// creamos la conexion con la base de datos
var conn = require('../lib/mongooseManager');
var anunciosCollection = 'anuncios';

var anuncioSchema = mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  venta: {
    type: Boolean,
    required: true
  },
  precio: {
    type: Number,
    required: true
  },
  foto: {
    type: String
  },
  tags: {
    type: [String]
  }
});

// Devolver la lista de anuncios
// validar campos antes de pasarselo
anuncioSchema.statics.list = function (cb, queryOptions) {
  var filters = {};
  if (queryOptions) {
    console.log('queryOptions: ', queryOptions);

    // Parsear y establecer los parametros de la query
    if (queryOptions.tag) { // filtrar por tags
      filters.tags = queryOptions.tag;
    }

    if (typeof queryOptions.sale === 'boolean') { // filtrar por sale(true)|search(false)
      filters.venta = queryOptions.sale;
    }

    if (queryOptions.range && typeof queryOptions.range === 'boolean') { // filtrar por precio gte y lte
      if (queryOptions.pricemin && queryOptions.pricemax) {
        filters.precio = { $gt: queryOptions.pricemin, $lt: queryOptions.pricemax };
      } else if (queryOptions.pricemin) {
        filters.precio = { $gt: queryOptions.pricemin };
      } else if (queryOptions.pricemax) {
        filters.precio = { $lt: queryOptions.pricemax };
      }
    }

    if (queryOptions.price && typeof queryOptions.price === 'number') {
      filters.precio = queryOptions.price;
    }

    if (queryOptions.name) { // filtrar por nombre
      filters.nombre = { $regex: queryOptions.name };
    }
  }

  var query = Anuncio.find(filters);

  // Paginacion
  if (typeof queryOptions.offset === 'number') {
    query.skip(queryOptions.offset);
  }

  if (typeof queryOptions.limit === 'number') {
    query.limit(queryOptions.limit);
  }

  // Ordenar la query por nombre/precio
  if (queryOptions && queryOptions.sort) {
    console.log('Sorting...');
    if (queryOptions.sort === 'price')
        query.sort('precio');
    else {
      query.sort('nombre');
    }
  }

  console.log('Filters: ', filters);
  return query.exec(function (err, rows) {
    if (err) {
      return cb(err);
    }

    return cb(null, rows);
  });
};

anuncioSchema.statics.findAd = function (cb, id) {
  var query = Anuncio.findOne({ _id: id });
  return query.exec(function (err, rows) {
    if (err) {
      return cb(err);
    }

    return cb(null, rows);
  });
};

anuncioSchema.statics.listTags = function (cb) {
  var query = Anuncio.find({});
  console.log('Querying tags...');
  query.select('tags');
  return query.exec(function (err, rows) {
    if (err) {
      return cb(err);
    }

    return cb(null, rows);
  });
};

var Anuncio = mongoose.model('anuncios', anuncioSchema);
