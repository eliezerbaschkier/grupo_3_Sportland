const path = require('path');
const fs = require('fs');
const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath));
const dotToComma = n => n.toString().replace(/\./, ",");
const commaToDot = n => n.toString().replace(/\,/, ".");
const dotToEmpty = n => n.toString().replace(/\./, "");
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

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
    
    edit: (req,res) => {
        let title = 'Editar producto';
        let productId = req.params.id;
        let productToEdit = products.filter(product => product.id === productId);
        res.render('./products/editProduct', {title: title, productToEdit: productToEdit, toThousand: toThousand, dotToComma: dotToComma});
    },

    update: (req, res) => {
        let productId = req.params.id;
        console.log(req.body);
        products.forEach(product => {
                if(product.id === productId) {
                    product.name = req.body.name;
                    product.description = req.body.description;
                    product.category = req.body.category;
                    product.color = req.body.color;
                    product.price = req.body.price;
                }
            });
        let productsJSON = JSON.stringify(products);
        fs.writeFileSync(productsFilePath, productsJSON);
        res.redirect('/'); //MODIFICAR EL REDIRECT CUANDO ESTÉ LA RUTA DE DETAIL
    }
};

module.exports = productsControllers;