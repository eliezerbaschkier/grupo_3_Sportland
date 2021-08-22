const express = require('express');
const router = express.Router();
const productsControllers = require('../controllers/productsControllers')

router.get('/productDetail', productsControllers.productDetail);
router.get('/productCart', productsControllers.productCart);
router.post('/productDetail', productsControllers.productDetail);
router.post('/productCart', productsControllers.productCart);

module.exports = router;