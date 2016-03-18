'use strict';

var mongoose = require('mongoose');

// creamos la conexion con la base de datos
var conn = require('../lib/mongooseManager');
var advertsCollection = 'adverts';

var anuncioSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  sale: {
    type: Boolean,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  photo: {
    type: String
  },
  tags: {
    type: [String]
  }
});

// Devolver la lista de adverts
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
      filters.sale = queryOptions.sale;
    }

    if (queryOptions.range && typeof queryOptions.range === 'boolean') { // filtrar por price gte y lte
      if (queryOptions.pricemin && queryOptions.pricemax) {
        filters.price = { $gt: queryOptions.pricemin, $lt: queryOptions.pricemax };
      } else if (queryOptions.pricemin) {
        filters.price = { $gt: queryOptions.pricemin };
      } else if (queryOptions.pricemax) {
        filters.price = { $lt: queryOptions.pricemax };
      }
    }

    if (queryOptions.price && typeof queryOptions.price === 'number') {
      filters.price = queryOptions.price;
    }

    if (queryOptions.name) { // filtrar por name
      filters.name = { $regex: queryOptions.name };
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

  // Ordenar la query por name/price
  if (queryOptions && queryOptions.sort) {
    console.log('Sorting...');
    if (queryOptions.sort === 'price')
        query.sort('price');
    else {
      query.sort('name');
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

var Anuncio = mongoose.model('adverts', anuncioSchema);
