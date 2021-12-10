const path = require('path');
const db = require('../../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
//const { Console } = require('console');
//const moment = require('moment');//????????????????????

const usersAPIController = {

    'userList': (req,res) => {
        db.User.findAll({attributes: ['id','first_name', 'last_name', 'email']})
            .then(users => {

                for(i = 0 ; i < users.length ; i++) {
                    users[i]['dataValues']['detail'] = req.protocol + '://' + req.headers.host + '/api/users/' + users[i].id;
                };


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
    },


    userDetail: (req,res) => {



        db.User.findByPk(req.params.id,{
            attributes: ['id', 'first_name', 'last_name', 'email', 'image'],
        })
        .then(
            user=>{

                

                    user['dataValues']['image'] = req.protocol + '://' + req.headers.host + '/images/users/' + user.image;
              

                res.json(user);
            }
        )
        .catch((error) => {
            console.log(error);
        });

    }






}

module.exports = usersAPIController;

