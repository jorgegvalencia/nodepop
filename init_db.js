'use strict'

var mongoose = require('mongoose');
var fs = require('fs');
var async = require('async');

require('./model/anuncio_model');
require('./model/usuario_model');

var Anuncio = mongoose.model('adverts');
var User = mongoose.model('users');

function setDatabaseAds() {
  mongoose.connection.collections['adverts'].drop(function (err) {
    if (err) {
      console.log("Collection does not exist.");
    }
    console.log('collection dropped');
    fs.readFile('./anuncios.json', 'utf8', function (err, data) {
      if (err) {
        return;
      }
      else {
        var anuncios = JSON.parse(data);
        async.eachSeries(anuncios.anuncios,
          function (item, next) {
            var anuncio = new Anuncio(item);
            console.log(anuncio);
            anuncio.save(function (err) {
              next();
            });
          },
          function end(err) {
            mongoose.connection.close();
            setDatabaseUsers();
          }
        );
      }
    });
  });
}

function setDatabaseUsers() {
  mongoose.connection.collections['users'].drop(function (err) {
    if (err) {
      console.log("Collection does not exist.");
    }
    console.log('collection dropped');
    fs.readFile('./usuarios.json', 'utf8', function (err, data) {
      if (err) {
        return;
      }
      else {
        var usuarios = JSON.parse(data);
        async.eachSeries(usuarios.usuarios,
          function (item, next) {
            var usuario = new User(item);
            console.log(usuario);
            usuario.save(function (err) {
              next();
            });
          },
          function end(err) {
            mongoose.connection.close();
          }
        );
      }
    });
  });
}

setDatabaseAds();