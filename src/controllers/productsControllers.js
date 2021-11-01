const path = require('path');
const fs = require('fs');
const productsFilePath = path.join(__dirname, '../data/products.json');
const dotToComma = n => n.toString().replace(/\./, ",");
const commaToDot = n => n.toString().replace(/\,/, ".");
const dotToEmpty = n => n.toString().replace(/\./, "");
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");

const productsControllers = {
    productList: (req,res) => {
        let title = 'Lista de productos';
        db.Product.findAll()
            .then(products => {
                res.render('./products/products', {title: title, products: products});
            })
            .catch((error) => {
                console.log(error);
            });
    },

    productDetail: (req,res) => {
        let title = 'Detalle de producto';
        db.Product.findByPk(req.params.id)
            .then(product => {
                res.render('./products/productDetail', {title: title, productId: req.params.id, productToShowInDetail: product });
            })
            .catch((error) => {
                console.log(error);
            });
    },

    productCart: (req,res) => {
        let title = 'Tu carrito';
        res.render('./products/productCart', {title: title});
    },

    createProduct: (req,res) => {
        let title = 'Crear producto';
        db.ProductCategory.findAll()
            .then(categories => {
                res.render('./products/createProduct', {title: title, categories});
            })
            .catch((error) => {
                console.log(error);
            });
    },

    store: (req,res) => {
        if (req.file) {
			db.Product.create({
				name: req.body.name,
				price: req.body.price,
				category_id: req.body.category,
				description: req.body.description,
				image: req.file.filename
			})
                .then(() => {
                    res.redirect('/products');
                })
                .catch((error) => {
                    console.log(error);
                });
		} else {
			res.redirect('/products/create');
		}
    },
    
    edit: (req,res) => {
        let title = 'Editar producto';
        let productRequest = db.Product.findByPk(req.params.id, {
            include: [
                {association: 'categories'}
            ]
        });

        let categoriesRequest = db.ProductCategory.findAll();

        Promise.all([productRequest, categoriesRequest])
            .then(([product, categories]) => {
                res.render('./products/editProduct',
                {title: title, productToEdit: product, categories,
                toThousand: toThousand, dotToComma: dotToComma});
            })
            .catch((error) => {
                console.log(error);
            });
    },

    update: (req, res) => {

        if (req.file){
            db.Product.update(
                {
                    name: req.body.name,
                    price: req.body.price,
                    category_id: req.body.category,
                    description: req.body.description,
                    image: req.file.filename
                },
                {
                    where: {
                        id: req.params.id
                }
                }
            )
                .then(() => {
                    /* TODO: delete old image if new image is added
                    let indexProduct = products.findIndex(product => product.id == productId);
                        let imagePath = path.join(__dirname, '../../public/images/products', products[indexProduct].image);
                            fs.unlink(imagePath, function (err) {
                                if (err) {
                                    console.log('Could not delete file');
                                };
                            });
                    */
                    res.redirect('/products');
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            db.Product.update(
                {
                    name: req.body.name,
                    price: req.body.price,
                    category_id: req.body.category,
                    description: req.body.description,
                },
                {
                    where: {
                        id: req.params.id
                }
                }
            )
                .then(() => {
                    res.redirect('/products');
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    },

    delete: (req, res) => {

        db.Product.destroy({
            where: {
                id : req.params.id
                }
            }
        )
            .then(() => {
                res.redirect('/products');
            })
            .catch((error) => {
                console.log(error);
            });
    },

    search: (req, res) => {
        let title = 'Búsqueda de' /*+ `${req.query.search}`*/;
        console.log(req.query.search);
        db.Product.findAll({
            where: {
              name: {[db.Sequelize.Op.like] : `%${req.query.search}%`}  
            }
        })
            .then((products) => {
                res.render('./products/productSearch', {products, title});
            })
            .catch((error) => {
                console.log(error);
            });
    }
    
};

module.exports = productsControllers;