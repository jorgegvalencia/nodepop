'use strict';

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var auth = require('../../../lib/auth');

var Anuncio = mongoose.model('anuncios');

/**
  @apiDefine Ad
  @apiSuccess {String} ._id Id of the ad.
  @apiSuccess {String} ._v Version of the ad.
  @apiSuccess {String} .name Title of the ad.
  @apiSuccess {String} .sale Type of the ad: sale or search.
  @apiSuccess {Number} .price Price of the item.
  @apiSuccess {String} .photo URL of the cover image.
  @apiSuccess {String[]} ad.tags List of the tags related to the ad.
*/

/**
 *  @api {get} /anuncios/ Get a list of the current ads.
 *  @apiVersion 1.0.0
 *  @apiName GetAds
 *  @apiGroup Ads
 *
 *  @apiParam {String} [tag] Name of the tag to filter by.
 *  @apiParam {Boolean="true","false"} [sale] Filter ads by sales (true) or searches (false).
 *  @apiParam {String="min-max","min-","-max","exact"} [price] Range of the price of the ads.
 *  @apiParam {String} [name] Name of the article in the ad.
 *  @apiParam {String="name","price"} [sort=name] Sort ads by name or price.
 *  @apiParam {Number} [limit] Number of the maximum results to return.
 *  @apiParam {Number} [offset] For pagination purposes. Skip the first amount of ads defined by the offset.
 *
 *  @apiSuccess {Boolean} result=true Variable to indicate success.
 *  @apiSuccess {Object} options Object with the filter options.
 *  @apiSuccess {Object[]} rows Array with the ads objects.
 *  @apiUse Ad
 *
   @apiSuccessExample Success-Response:
       HTTP/1.1 200 OK
       {
         "result": true,
         "rows": [{
           "_id": "56ea993380429ac01b847f2a",
           "_v": 0,
           "name": "iPhone",
           "sale": "true",
           "price": 500,
           "photo": "iphone.jpg",
           "tags": ["mobile", "lifestyle"]
         },{
           "_id": "56ea993380429ac52b847f2a",
           "_v": 0,
           "name": "Biciteta",
           "sale": "true",
           "price": 170,
           "photo": "biciteta.jpg",
           "tags": ["mobile", "lifestyle"]
         }],
         "options":{}
       }
 */

router.get('/', auth(), function (req, res, next) {
  // Parsear y validar query params
  var options = {};

  // Tipo de busqueda
  if (req.query.sale) {
    if (req.query.sale == 'true') {
      options.sale = true;
    } else if (req.query.sale == 'false') {
      options.sale = false;
    }

    console.log(typeof options.sale);
  }

  // Filtrado difuso por nombre
  if (req.query.name) {
    console.log('Nombre: ', req.query.name);
    options.name = new RegExp('^' + req.query.name, 'i');
  }

  // Filtrado por rango de precios
  if (req.query.price) {
    if (req.query.price.match('^\\d*-\\d*$')) {
      console.log('paso, ', req.query.price);
      options.range = true;
      var range = req.query.price.split('-');
      if (range[0] !== '') {
        options.pricemin = parseInt(range[0]);
      }

      if (range[1] !== '') {
        options.pricemax = parseInt(range[1]);
      }
    } else if (req.query.price.match('^\\d+$')) {
      options.price = parseInt(req.query.price);
    }
  } else {
    options.range = false;
  }

  // Ordenacion por (precio/nombre)
  if (req.query.sort) {
    if (req.query.sort === 'price') {
      options.sort = 'price';
    } else if (req.query.sort === 'name') {
      options.sort = 'name';
    }
  }

  // Filtro por tags
  if (req.query.tag) {
    options.tag = req.query.tag;
  }

  // Paginacion
  if (req.query.limit && req.query.limit.match('\\d+')) {
    options.limit = parseInt(req.query.limit);
  }

  if (req.query.offset && req.query.offset.match('\\d+')) {
    options.offset = parseInt(req.query.offset);
  }

  console.log('Opciones:', options);
  console.log('Query-string: ', req.query);

  Anuncio.list(function (err, rows) {
    if (err) {
      console.log(err);

      // Devolver el json con el error
      res.json({ result: false, err: err });
      console.log('Devolviendo error');
      return;
    }

    // Devolver el json con la /anuncios/lista de anuncios
    res.json({ result: true, options: req.query, rows: rows });
    console.log('Devolviendo lista de anuncios');

    // return;
  },

  options
  );
});

/**
 *  @api {get} /anuncios/detail/:anuncio Get the ad details.
 *  @apiVersion 1.0.0
 *  @apiName GetAd
 *  @apiGroup Ads
 *
 *  @apiParam {Number} anuncio Id of the requested ad.
 *
 *  @apiSuccess {Boolean} result=true Variable to indicate success.
 *  @apiSuccess {Object} rows Object with the ad data.
 *  @apiUse Ad
 *
   @apiSuccessExample Success-Response:
       HTTP/1.1 200 OK
       {
         "result": true,
         "rows": [{
           "_id": "56ea993380429ac01b847f2a",
           "_v": 0,
           "name": "iPhone",
           "sale": "true",
           "price": 500,
           "photo": "iphone.jpg",
           "tags": ["mobile", "lifestyle"]
         }]
       }

 */

router.get('/detail/:anuncio', function (req, res) {
  Anuncio.findAd(function (err, rows) {
    if (err) {
      console.log(err);

      // Devolver el json con el error
      res.json({ result: false, err: err });
      return;
    }

    // Devolver el json con el anuncio
    res.json({ result: true, rows: rows });

    // return;
  },

  req.params.anuncio
  );
});

/**
 *  @api {post} /anuncios/ Create a new ad.
 *  @apiVersion 0.1.0
 *  @apiName createAd
 *  @apiGroup Ads
 *
 *  @apiSuccess (201) {String} _id Id of the Ad
 *  @apiSuccess (201) {Number} _v Version number.
 *  @apiSuccess (201) {String} name Name of the Ad
 *  @apiSuccess (201) {String} sale Type of Ad: sale or search
 *  @apiSuccess (201) {Number} price Price of the item
 *  @apiSuccess (201) {String} photo URL of the cover image
 *  @apiSuccess (201) {[String]} tags List of the tags related to the ad
 *
 *  @apiSuccessExample (201) Success-Response:
 *      HTTP/1.1 201 Created
 *      {
 *          "_id": "56ea993380429ac01b847f2a",
 *          "_v": 0,
 *          "name": "iPhone",
 *          "sale": "true",
 *          "price": 500,
 *          "photo": "iphone.jpg",
 *          "tags": ["mobile", "lifestyle"]
 *      }
 */

router.post('/', function (req, res) {
  var anuncio = new Anuncio(req.body);
  anuncio.save(function (err, created) {
    if (err) {
      res.json({ result: false, err: err });
      return;
    }

    res.status(201).json({ result: true, row: created });
  });
});

module.exports = router;
