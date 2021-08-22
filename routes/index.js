const express = require('express');
const router = express.Router();
const indexControllers = require('../controllers/indexControllers')

router.get('/', indexControllers.home);
router.post('/', indexControllers.home);

module.exports = router;