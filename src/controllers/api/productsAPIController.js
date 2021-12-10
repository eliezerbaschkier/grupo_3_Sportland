const db = require('../../database/models');
const { QueryTypes } = require('sequelize');

const productsAPIControllers = {
    productList: async (req,res) => {
        const productCount = await db.sequelize.query("SELECT COUNT(DISTINCT id) AS quantity FROM sportland.products", { type: QueryTypes.SELECT });
        const productCountByCategory = await db.sequelize.query("SELECT productCategory.name AS category, COUNT(*) AS quantity FROM sportland.products, sportland.productCategory WHERE products.category_id = productCategory.id GROUP BY products.category_id ", { type: QueryTypes.SELECT });
        let title = 'API Products List';
        let productsRequest = db.Product.findAll({
            attributes: ['id', 'name', 'description'],
            include: {
                association: 'categories'
                /*
                model: 'productCategory',
                as: 'category',
                attributes: ['name'],
                through: {
                    attributes: []
                }
                */
            }
        });
        let categoriesRequest = db.ProductCategory.findAll({
            attributes: ['id', 'name']
        });

        Promise.all([productsRequest, categoriesRequest])
            .then(([products, categories]) => {
                //let categoriesList = [];
                /*
                for (i = 0 ; i < categories.length ; i++) {
                    categoriesList.push({
                        id: categories[i]['dataValues']['id'],
                        name: categories[i]['dataValues']['name']
                    })
                };
                */
                for(i = 0 ; i < products.length ; i++) {
                    products[i]['dataValues']['detail'] = req.protocol + '://' + req.headers.host + '/api/products/' + products[i].id;
                };
                
                for(i = 0 ; i < products.length ; i++) {
                    delete products[i].dataValues.categories.dataValues.id;
                    delete products[i].dataValues.categories.dataValues.created_at;
                    delete products[i].dataValues.categories.dataValues.modified_at;
                    delete products[i].dataValues.categories.dataValues.deleted_at;
                }
                

                let respuesta = {
                    meta: {
                        status : 200,
                        url: 'api/products'
                    },
                    count: productCount,
                    countByCategory: productCountByCategory,
                    products
                };
                
                res.json(respuesta);
            })
            .catch((error) => {
                console.log(error);
            });
    },

    productDetail: (req,res) => {
        let title = 'API product detail';
        db.Product.findByPk(req.params.id,{
            attributes: ['id', 'name', 'description', 'price', 'image'],
            include: {
                association: 'categories'
            }
        })
            .then(product => {
                delete product.dataValues.categories.dataValues.id;
                delete product.dataValues.categories.dataValues.created_at;
                delete product.dataValues.categories.dataValues.modified_at;
                delete product.dataValues.categories.dataValues.deleted_at;

                console.log(product.dataValues.image);
                console.log(req.protocol);
                product.dataValues.image = req.protocol + '://' + req.headers.host + '/images/products/' + product.dataValues.image;


                let respuesta = {
                    meta: {
                        status : 200,
                        total: product.length,
                        url: 'api/products/' + product.dataValues.id
                    },
                    data: product
                };
                res.json(respuesta);            
            })
            .catch((error) => {
                console.log(error);
            });
    }
}

module.exports = productsAPIControllers;