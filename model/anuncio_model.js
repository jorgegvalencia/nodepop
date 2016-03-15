'use strict';

var mongoose = require('mongoose');

// creamos la conexion con la base de datos
var conn = require('../lib/mongooseManager');
var anunciosCollection = 'anuncios';

var anuncioSchema = mongoose.Schema({
  nombre:{
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
anuncioSchema.statics.list = function (cb, queryOptions, pag) {
  var filters = {};
  if (queryOptions) {
      console.log('queryOptions: ', queryOptions);

      // Parsear y establecer los parametros de la query
      if (queryOptions.tags) {
          // filtrar por tags
          filters.tag = { $in: tags };
      } else if (typeof queryOptions.sale === Boolean) {
          // filtrar por sale(true)|search(false)
          filters.venta = queryOptions.sale;
      } else if (queryOptions.range) {
          // filtrar por precio gte y lte
          filters.precio = { $gt: queryOptions.pricemin, $lt: queryOptions.pricemax };
      } else if (queryOptions.name) {
          // filtrar por nombre
          filters.nombre = { $regex: queryOptions.name };
      }
  }


  console.log('Filters: ', filters);

  // Paginacion
  // query.skip(5*(pag-1));
  // query.limit(5);
  // Ordenar la query por nombre|precio
  var query = Anuncio.find(filters);
  if (queryOptions && queryOptions.sort) {
    console.log('Sorting...');
    if(queryOptions.sort === 'price')
        query.sort('precio');
    else{
        query.sort('nombre');
    }
  }

  return query.exec(function (err, rows) {
    if (err) {
      return cb(err);
    }

    return cb(null, rows);
  });
};

anuncioSchema.statics.findAd = function (cb, id) {
  var query = Anuncio.find({ _id: id });
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
