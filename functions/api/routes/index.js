const express = require('express');
const router = express.Router();

router.use('/question', require('./question'));
router.use('/answer', require('./answer'));
router.use('/best', require('./best'));

module.exports = router;