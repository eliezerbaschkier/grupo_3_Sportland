const path = require('path');

const productsControllers = {
    productDetail: (req,res) => {
        let title = 'Detalle de producto';
        res.render('./products/productDetail', {title: title});
    },

    productCart: (req,res) => {
        let title = 'Tu carrito';
        res.render('./products/productCart', {title: title});
    }
};

module.exports = productsControllers;