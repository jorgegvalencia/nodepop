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
anuncioSchema.statics.list = function(cb, queryOptions, pag) {
    var query = Anuncio.find({});
    var filters = {};
    if (queryOptions) {
        // Parsear y establecer los parametros de la query
        if (queryOptions.tags) {
            // filtrar por tags
            filters.tag = { $in: tags };
        } else if (queryOptions.type !== null) {
            // filtrar por sale(true)|search(false)
            filters.type = { type: queryOptions.type }
        } else if (queryOptions.price) {
            // filtrar por precio gte y lte
            filters.age = { $gt: queryOptions.pricemin, $lt: queryOptions.pricemax }
        } else if (queryOptions.name) {
            // filtrar por nombre
            filters.name = { $regex: queryOptions.name }
        }
    }
    // Paginacion
    // query.skip(5*(pag-1));
    // query.limit(5);
    // Ordenar la query por nombre|precio
    if (queryOptions && queryOptions.sort) {
        query.sort(queryParam.sort);
    }
    return query.exec(function(err, rows) {
        if (err) {
            return cb(err);
        }

        return cb(null, rows);
    });
};

anuncioSchema.statics.findAd = function(cb, id) {
    var query = Anuncio.find({ id: id });
    return query.exec(function(err, rows) {
        if (err) {
            return cb(err);
        }

        return cb(null, rows);
    });
};

anuncioSchema.statics.listTags = function(cb){
  var query = Anuncio.find({});
  console.log('Querying tags...');
  query.select('tags');
  return query.exec(function(err, rows) {
        if (err) {
            return cb(err);
        }

        return cb(null, rows);
    });
}

var Anuncio = mongoose.model('anuncios', anuncioSchema);
