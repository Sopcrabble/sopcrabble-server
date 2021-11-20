const express = require('express');
const router = express.Router();

router.get('/list/:id', require('./answerListIdGET'));
router.get('/:id', require('./answerIdGET.js'));
router.put('/:id', require('./answerIdPUT'))

module.exports = router;
