module.exports = (sequelize, dataTypes) => {
    let alias = 'Product';
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
            type: dataTypes.STRING(200),
            allowNull: false
        },
        description: {
            type: dataTypes.STRING(1000),
            allowNull: false
        },
        price: {
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        image: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        category_id: {
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: false
        }
    };
    let config = {
        tableName: 'products',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'modified_at',
        deletedAt: 'deleted_at',
        paranoid: true
    }
    const Product = sequelize.define(alias,cols,config);

    Product.associate = models => {
        Product.belongsTo(models.ProductCategory, {
            as: 'categories',
            foreignKey: 'category_id'
        });
        /*
        Movie.belongsToMany(models.Actor, {
            as: 'actors',
            through: 'actor_movie',
            foreignKey: 'movie_id',
            otherKey: 'actor_id'
        })
        */
    };

    return Product
};