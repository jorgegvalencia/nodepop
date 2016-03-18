'use strict';

let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let utils = require('../../../lib/utils');

let Anuncio = mongoose.model('adverts');

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
      return res.json({ result: false, error: utils.dbErrorResponse(err) });
    }

    let tags = [];
    for (let i = 0; i < rows.length; i++) {
      tags = utils.mergeArrays(rows[i].tags, tags);
    }

    // Devolver el json con el anuncio
    res.json({ result: true, rows: { tags } });
  });
});

module.exports = router;
