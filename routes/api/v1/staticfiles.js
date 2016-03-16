'use strict';

var router = express.Router();

router.get('/anuncios/:file', function (req, res) {
	express.static(path.join(__dirname, 'public'))
})