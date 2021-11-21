const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const productsControllers = require('../controllers/productsControllers')
const productsValidations = require('../middlewares/createProductValidationMW');


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

// Products list //
router.get('/', productsControllers.productList);

// Product detail // 
router.get('/detail/:id', productsControllers.productDetail);

// Product Cart //
router.get('/productCart', productsControllers.productCart);

// Create product //
router.get('/create', productsControllers.createProduct);
router.post('/', upload.single('image'), productsValidations,productsControllers.store);

// Edit product //
router.get('/:id/edit', productsControllers.edit);
router.put('/:id', upload.single('image'), productsControllers.update)

// Delete product //
router.delete('/:id', productsControllers.delete)

// Search product //
router.get('/search/', productsControllers.search);

/*
router.post('/productDetail', productsControllers.productDetail);
router.post('/productCart', productsControllers.productCart);
*/

module.exports = router;