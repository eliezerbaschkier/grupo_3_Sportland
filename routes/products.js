const express = require('express');
const router = express.Router();
const productsControllers = require('../controllers/productsControllers')

router.get('/:id', productsControllers.productDetail);
router.get('/productCart', productsControllers.productCart);
router.get('/create', productsControllers.createProduct);
router.get('/:id/edit', productsControllers.edit);
router.put('/:id', productsControllers.update)
router.post('/productDetail', productsControllers.productDetail);
router.post('/productCart', productsControllers.productCart);

module.exports = router;