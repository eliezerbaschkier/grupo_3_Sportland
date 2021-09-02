const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const productsControllers = require('../controllers/productsControllers')

/*
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(__dirname, '../../public/images/products'));
    } ,

    filename: function(req, file, cb) {
        const newFileName = 'product-' + Date.now() + path.extname(file.originalname);
        cb(null, newFileName);
    }
})

const upload = multer({ storage });
*/

router.get('/detail/:id', productsControllers.productDetail);
router.get('/productCart', productsControllers.productCart);
router.get('/create', productsControllers.createProduct);
router.get('/:id/edit', productsControllers.edit);
router.put('/:id', productsControllers.update)
router.delete('/:id', productsControllers.delete)
router.post('/productDetail', productsControllers.productDetail);
router.post('/productCart', productsControllers.productCart);

module.exports = router;