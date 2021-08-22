const path = require('path');

const productsControllers = {
    productDetail: (req,res) => {
        let title = 'Detalle de producto';
        res.render('./products/productDetail', {title: title});
    },

    productCart: (req,res) => {
        let title = 'Tu carrito';
        res.render('./products/productCart', {title: title});
    },

    createProduct: (req,res) => {
        let title = 'Crear producto';
        res.render('./products/createProduct', {title: title});
    },
    
    editProduct: (req,res) => {
        let title = 'Editar producto';
        res.render('./products/editProduct', {title: title});
    }
};

module.exports = productsControllers;