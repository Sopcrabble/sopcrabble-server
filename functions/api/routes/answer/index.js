const express = require('express');
const router = express.Router();

router.get('/list/:id', require('./answerListIdGET'));
router.get('/:id', require('./answerIdGET.js'));
router.post('/:id', require('./answerIdPOST.js'));

module.exports = router;
