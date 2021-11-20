const express = require('express');
const router = express.Router();

router.post('/', require('./questionPOST'));

module.exports = router;