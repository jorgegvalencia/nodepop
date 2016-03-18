'use strict'

var mongoose = require('mongoose');
var fs = require('fs');
var async = require('async');
var conn = require('./lib/mongooseManager');

require('./model/anuncio_model');

var Anuncio = mongoose.model('adverts');

function setDatabaseAds() {
	mongoose.connection.collections['adverts'].drop( function(err) {
    	console.log('collection dropped');
    	if (err) {
        	console.log(err);
            return;
        }
         fs.readFile('./anuncios.json', 'utf8', function(err, data) {
            if (err) {
            	return;
            } else {
                var anuncios = JSON.parse(data);
                async.eachSeries(anuncios.anuncios,
                    function(item, next) {
                    	var anuncio = new Anuncio(item);
                    	console.log(anuncio);
                        anuncio.save(function(err){
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

