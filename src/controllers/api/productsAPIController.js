const db = require('../../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");

const productsAPIControllers = {
    productList: (req,res) => {
        let title = 'API Products List';
        db.Product.findAll()
            .then(products => {
                let respuesta = {
                    meta: {
                        status : 200,
                        total: products.length,
                        url: 'api/products'
                    },
                    data: products
                }
                    res.json(respuesta);
            })
            .catch((error) => {
                console.log(error);
            });
    }
}

module.exports = productsAPIControllers;