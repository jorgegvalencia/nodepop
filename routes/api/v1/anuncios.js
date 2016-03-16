'use strict';

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var auth = require('../../../lib/auth');

var Anuncio = mongoose.model('anuncios');

/**
 *  @api {get} /anuncios/ GetAdsList
 *  @apiVersion 0.1.0
 *  @apiName getAds
 *  @apiGroup Ad
 *
 *  @apiParam {Number} page of ads to display.
 *
 *  @apiSuccess {String} id Id of the Ad
 *  @apiSuccess {String} name Name of the Ad
 *  @apiSuccess {String} sale Type of Ad: sale or search
 *  @apiSuccess {Number} price Price of the item
 *  @apiSuccess {String} photo URL of the cover image
 *  @apiSuccess {[String]} tags List of the tags related to the ad
 *
 *  @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "name": "iPhone",
 *          "sale": "true",
 *          "price": 500,
 *          "photo": "public/iphone.jpg",
 *          "tags": ["mobile", "lifestyle"]
 *      }
 *  @apiError AdsNotFound Empty database
 *
 *  @apiErrorExample Error-Response:
 *      HTTP/1.1 404 Not Found
 *      {
 *        "error": "EmptyDatabase"
 *      }
 */

router.get('/', auth(), function (req, res, next) {
  // Parsear y validar query params
  // var tags = req.query.tags.split() || '';
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
  if (req.query.price){
    if(req.query.price.match('^\\d*-\\d*$')) {
      console.log('paso, ',req.query.price);
      options.range = true;
      var range = req.query.price.split('-');
      if(range[0] !== ''){
        options.pricemin = parseInt(range[0]);
      }
      if(range[1] !== ''){
        options.pricemax = parseInt(range[1]);
      }
    }
    else if(req.query.price.match('^\\d+$')){
      options.price = parseInt(req.query.price);
    }
  } 
  else {
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
  var page = 1;
  console.log('Query-string: ', req.query);

  // res.redirect('/anuncios/'+page);
  Anuncio.list(function (err, rows) {
    if (err) {
      console.log(err);

      // Devolver el json con el error
      res.json({ result: false, err: err });
      console.log('Devolviendo error');
      return;
    }

    // Devolver el json con la /anuncios/lista de anuncios
    res.json({ result: true, rows: rows, options: req.query });
    console.log('Devolviendo lista de anuncios');

    // return;
  },

  options
  );
});

// router.get('/:page', function (req, res) {
// 	console.log(req.query);
// 	Anuncio.list(function (err, rows) {
//     if (err) {
//       console.log(err);

//       // Devolver el json con el error
//       res.json({ result: false, err: err });
//       console.log("Devolviendo error");
//       return;
//     }

//     // Devolver el json con la lista de anuncios
//     res.json({ result: true, rows: rows, options: req.query });
//     console.log("Devolviendo lista de anuncios");
//     // return;
//   },

//   req.queryOptions,
//   req.params.page
// );

//})

/**
 *  @api {get} /anuncios/detail/:anuncio GetAd
 *  @apiVersion 0.1.0
 *  @apiName getAd
 *  @apiGroup Ad
 *
 *  @apiParam {Number} anuncio Ad details to display.
 *
 *  @apiSuccess {String} id Id of the Ad
 *  @apiSuccess {String} name Name of the Ad
 *  @apiSuccess {String} sale Type of Ad: sale or search
 *  @apiSuccess {Number} price Price of the item
 *  @apiSuccess {String} photo URL of the cover image
 *  @apiSuccess {[String]} tags List of the tags related to the ad
 *
 *  @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "name": "iPhone",
 *          "sale": "true",
 *          "price": 500,
 *          "photo": "public/iphone.jpg",
 *          "tags": ["mobile", "lifestyle"]
 *      }
 *  @apiError AdsNotFound Empty database
 *
 *  @apiErrorExample Error-Response:
 *      HTTP/1.1 404 Not Found
 *      {
 *        "error": "EmptyDatabase"
 *      }
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
 *  @api {post} /anuncios/ CreateAd
 *  @apiVersion 0.1.0
 *  @apiName createAds
 *  @apiGroup Ad
 *
 *  @apiSuccess {String} id Id of the Ad
 *  @apiSuccess {String} name Name of the Ad
 *  @apiSuccess {String} sale Type of Ad: sale or search
 *  @apiSuccess {Number} price Price of the item
 *  @apiSuccess {String} photo URL of the cover image
 *  @apiSuccess {[String]} tags List of the tags related to the ad
 *
 *  @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "name": "iPhone",
 *          "sale": "true",
 *          "price": 500,
 *          "photo": "public/iphone.jpg",
 *          "tags": ["mobile", "lifestyle"]
 *      }
 *  @apiError WrongParams Wrong parameters
 *
 *  @apiErrorExample Error-Response:
 *      HTTP/1.1 404 Not Found
 *      {
 *				"result": false,
 *        "err": "WrongParams"
 *      }
 */

router.post('/', function (req, res) {
  var anuncio = new Anuncio(req.body);
  anuncio.save(function (err, created) {
    if (err) {
      res.json({ result: false, err: err });
      return;
    }

    res.json({ result: true, row: created });
  });
});

module.exports = router;
