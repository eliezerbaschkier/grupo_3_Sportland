const path = require('path');
const fs = require('fs');
const productsFilePath = path.join(__dirname, '../data/products.json');
const db = require('../database/models');

const indexControllers = {
    home: (req,res) => {
        let title = 'Sportland';
        db.Product.findAll({
            limit: 8
        })
            .then(products => {
                res.render('index', {title: title, products: products});
            })
            .catch((error) => {
                console.log(error);
            });

    }
};

module.exports = indexControllers;