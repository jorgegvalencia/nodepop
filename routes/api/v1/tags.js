'use strict';

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Anuncio = mongoose.model('anuncios');

/**
 * @api {get} /tags Get the list of existent tags
 *  @apiVersion 1.0.0
 *  @apiName GetTags
 *  @apiGroup Tags
 *
 *  @apiSuccess {Boolean} result=true Variable to indicate success.
 *  @apiSuccess {Object} rows Object with the array of existent tags.
 *  @apiSuccess {String[]} .tags Array of existent tags.
 *
 *  @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *    "result": true,
 *    "rows": {
 *      "tags": ["mobile", "lifestyle"]
 *    }
 *  }
 */
router.get('/', function (req, res) {
  Anuncio.listTags(function (err, rows) {
    if (err) {
      console.log(err);

      // Devolver el json con el error
      res.json({
        result: false,
        err: err
      });
      console.log('Devolviendo error');
      return;
    }

    // rows es un array con objetos que contienen un array
    console.log(rows);
    var tags = [];
    for (var i = 0; i < rows.length; i++) {
      tags = mergeArrays(rows[i].tags, tags);
    }

    // Devolver el json con el anuncio
    res.json({
      result: true,
      rows: {
        tags
      }
    });
  });
});

function mergeArrays(array1, array2) {
  var aux = array1.concat(array2);
  var result = aux.filter(function (item, pos) {
    return aux.indexOf(item) == pos;
  });

  return result;
}

module.exports = router;
