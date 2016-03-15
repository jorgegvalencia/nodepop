'use strict';

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Anuncio = mongoose.model('anuncios');

router.get('/list', function(req, res) {
    Anuncio.listTags(function(err, rows) {
        if (err) {
            console.log(err);
            // Devolver el json con el error
            res.json({ result: false, err: err });
            console.log("Devolviendo error");
            return;
        }
        // rows es un objeto con objetos que contienen el id y un array de tags

        // Devolver el json con el anuncio
        res.json({ result: true, rows: rows });
    })

});
//TODO
router.get('/', function(req, res) {
    Anuncio.listTags(function(err, rows) {
        if (err) {
            console.log(err);
            // Devolver el json con el error
            res.json({ result: false, err: err });
            console.log("Devolviendo error");
            return;
        }
        // rows es un array con objetos que contienen un array
        console.log(rows);
        var tags = [];
        for(var i = 0; i < rows.length; i++){
        	tags = mergeArrays(rows[i].tags, tags);
        }

        // Devolver el json con el anuncio
        res.json({ result: true, tags: {tags} });
    })
});

function mergeArrays(array1, array2) {
	var returnArray = array1.slice();
	var auxArray = array2.slice();
	returnArray.concat(auxArray.filter(function (item) {
		return returnArray.indexOf(item) < 0; // el item no existe en el primer array
	}));
	return returnArray;
}

module.exports = router;