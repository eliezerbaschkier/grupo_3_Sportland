const path = require('path');
const db = require('../../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
//const { Console } = require('console');
//const moment = require('moment');//????????????????????

const usersAPIController = {

    'userList': (req,res) => {
        db.User.findAll()
            .then(users => {
                //res.render('./users/listadoUsuarios', {title: title, users: users});  //corresponde al Controller Original sin API.
                let respuesta = {
                    meta: {
                        status : 200,
                        total: users.length,
                        url: 'api/users'
                    },
                    data: users
                }
                console.log('HOLAAAAAAAAA');
                    res.json(respuesta);
            
            })//fin del then


           .catch((error) => {
                console.log(error);
            });
    }

};

module.exports = usersAPIController;

