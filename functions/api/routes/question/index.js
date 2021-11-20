const express = require('express');
const router = express.Router();

router.post('/', require('./questionPOST'));
router.get('/', require('./questionGET'));

module.exports = router;