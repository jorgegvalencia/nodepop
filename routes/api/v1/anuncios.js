var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
let anunciosCollection = 'anuncios';
let Anuncio = mongoose.model(anunciosCollection);

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

router.get('/anuncios/:page', function (req, res) {
  // Parsear y validar query params
  // req.query.tags
  // req.query.type
  // req.query.price
  // req.query.name
  // req.query.sort
  let queryParams;
  Anuncio.list(function (err, rows) {
    if (err) {
      console.log(err);

      // Devolver el json con el error
      res.json({ result: false, err: err });
      return;
    }

    // Devolver el json con la lista de anuncios
    res.json({ result: true, rows: rows });

    // return;
  },

  queryParams,
  req.params.page
);
});

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

router.get('/anuncios/detail/:anuncio', function (req, res) {
  Anuncio.findAd(function (err, rows) {
    if (err) {
      console.log(err);

      // Devolver el json con el error
      res.json({ result: false, err: err });
      return;
    }

    // Devolver el json con la lista de anuncios
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
 *        "error": "WrongParams"
 *      }
 */

router.post('/anuncios', function () {
  let anuncio = new Anuncio(req.body);
  anuncio.save(function (err, created) {
    if (err) {
      res.json({ result: false, err: err });
      return;
    }

    res.json({ result: true, row: created });
  });
});

module.exports = router;
