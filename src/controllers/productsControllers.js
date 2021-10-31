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
				id: Date.now(),
				name: req.body.name,
				price: req.body.price,
				category: req.body.category,
				description: req.body.description,
				image: req.file.filename
			})

			products.push(newProduct);
			let productsJSON = JSON.stringify(products, null, ' ');
			fs.writeFileSync(productsFilePath, productsJSON);
			res.redirect('/products'); 
		} else {
			res.redirect('/products/create');
		}
    },
    
    edit: (req,res) => {
        let title = 'Editar producto';
        let products = JSON.parse(fs.readFileSync(productsFilePath));
        let productId = req.params.id;
        let productToEdit = products.filter(product => product.id == productId);
        res.render('./products/editProduct', {title: title, productToEdit: productToEdit, toThousand: toThousand, dotToComma: dotToComma});
    },

    update: (req, res) => {
        let productId = req.params.id;
        let products = JSON.parse(fs.readFileSync(productsFilePath));
        products.forEach(product => {
            if(product.id == productId) {
                product.name = req.body.name;
                product.description = req.body.description;
                product.category = req.body.category;
                product.size = req.body.size;
                product.price = req.body.price;
                if (req.file) {
                    let indexProduct = products.findIndex(product => product.id == productId);
                    let imagePath = path.join(__dirname, '../../public/images/products', products[indexProduct].image);
                        fs.unlink(imagePath, function (err) {
                            if (err) {
                                console.log('Could not delete file');
                            };
                        });
                    product.image = req.file.filename;
                }
            }
        });
        let productsJSON = JSON.stringify(products, null, ' ');
        fs.writeFileSync(productsFilePath, productsJSON);
        res.redirect('/products'); 
    },

    delete: (req, res) => {
        let productId = req.params.id;
        let products = JSON.parse(fs.readFileSync(productsFilePath));
        let indexProduct = products.findIndex(product => product.id == productId);
        let imagePath = path.join(__dirname, '../../public/images/products', products[indexProduct].image);
        fs.unlink(imagePath, function (err) {
            if (err) {
                console.log('Could not delete file');
            };
        });
        let productsUpdated = products.filter(product => product.id != productId);
        let productsUpdatedJSON = JSON.stringify(productsUpdated, null, ' ');
        fs.writeFileSync(productsFilePath, productsUpdatedJSON);
        res.redirect('/products');
    }
};

module.exports = productsControllers;