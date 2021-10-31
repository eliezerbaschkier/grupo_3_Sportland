const Product = require("./Product");

module.exports = (sequelize, dataTypes) => {
    let alias = 'ProductCategory';
    let cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        // created_at: dataTypes.TIMESTAMP,
        // updated_at: dataTypes.TIMESTAMP,
        name: {
            type: dataTypes.STRING(100),
            allowNull: false
        }
    };
    let config = {
        tableName: 'productCategory',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'modified_at',
        deletedAt: 'deleted_at',
        paranoid: true
    }
    const ProductCategory = sequelize.define(alias, cols, config);

    ProductCategory.associate = models => {
        ProductCategory.hasMany(models.Product, {
            as: 'products',
            foreignKey: 'category_id'
        });
    };

    return ProductCategory
};