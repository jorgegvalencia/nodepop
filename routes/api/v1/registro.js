'use strict';

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
// var aes256 = require('aes256');
var crypto = require("crypto");

var User = mongoose.model('usuarios');

var key = 'cl4V3l4rgac0nNum3rOsyLetR4S';

/**
@apiDefine User 
 *  @apiSuccess {Object} user Object with the new user object.
 *  @apiSuccess {Number} user._v Version number.
 *  @apiSuccess {String} user.nombre Username of the new user.
 *  @apiSuccess {String} user.email Email of the new user.
 *  @apiSuccess {String} user.password Password hash of the new user.
 *  @apiSuccess {String} user._id Id of the new user.
*/

/**
 * @api {post} /signin Register a new user.
 *  @apiVersion 1.0.0
 *  @apiName SignIn
 *  @apiGroup Sign In
 *  
 *  @apiParam  {String} name Username.
 *  @apiParam  {String} email Email.
 *  @apiParam  {String} password Password.
 *
 *  @apiSuccess {Boolean} result=true Variable to indicate success.
 *  @apiUse User
 *
   @apiSuccessExample Success-Response:
     HTTP/1.1 201 Created
     {
      "result": true,
      "user": {
        "_v": 0,
        "nombre": "newuser",
        "email": "email@example.com",
        "password": "73bb31e779581af66b21a08a58c4549aa58fe16b131a554723c9155681601e9b",
        "_id": "56ea964d8e05fffc13384d50"
      }
    }

 */
router.post('/', function (req, res) {
  // validacion de campos del registro
  var userdata = {
    nombre: req.body.name,
    email: req.body.email,
    password: crypto.createHmac('sha256', key).update(req.body.password).digest('hex')
  };
  if(!validateEmail(userdata.email)){
    res.json({ result: false, err: 'Invalid email address' });
    return;
  }
  var usuario = new User(userdata);
  usuario.save(function (err, created) {
    if (err) {
      res.json({ result: false, err: err });
      return;
    }

    res.status(201).json({ result: true, user: created });
  });
});


// http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

module.exports = router;

