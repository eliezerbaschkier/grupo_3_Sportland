const path = require('path');
const fs = require('fs');
const productsFilePath = path.join(__dirname, '../data/users.json');
const dotToComma = n => n.toString().replace(/\./, ",");
const commaToDot = n => n.toString().replace(/\,/, ".");
const dotToEmpty = n => n.toString().replace(/\./, "");
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");

const probando = {
    probandoList: (req,res) => {
        let title = 'probando';
        db.User.findAll()
            .then(users => {
                res.render('./users/listadoUsuarios', {title: title, users: users});
            })
            .catch((error) => {
                console.log(error);
            });
    },
  
};

module.exports = probando;