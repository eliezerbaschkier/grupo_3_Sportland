const express = require('express');
const router = express.Router();
const productsControllers = require('../controllers/productsControllers')

router.get('/productDetail', productsControllers.productDetail);
router.get('/productCart', productsControllers.productCart);
router.get('/createProduct', productsControllers.createProduct);
router.get('/editProduct', productsControllers.editProduct);
router.post('/productDetail', productsControllers.productDetail);
router.post('/productCart', productsControllers.productCart);

module.exports = router;