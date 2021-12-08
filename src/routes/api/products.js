const express = require('express');
const router = express.Router();
const productsAPIControllers = require('../../controllers/api/productsAPIController');

router.get('/', productsAPIControllers.productList);
router.get('/:id', productsAPIControllers.productDetail);

module.exports = router;