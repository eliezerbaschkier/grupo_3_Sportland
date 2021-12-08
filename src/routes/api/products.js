const express = require('express');
const router = express.Router();
const productsAPIControllers = require('../../controllers/api/productsAPIController');

router.get('/', productsAPIControllers.productList);

module.exports = router;