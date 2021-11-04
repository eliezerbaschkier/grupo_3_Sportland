const path = require('path');
const User = require('../models/userModel');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');

//-----------------------------------------sprint 6
const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const { Console } = require('console');
//-------------------------------------------------


const usersControllers = {

    userList: (req,res) => {
        let title = 'Listado de Usuarios';
        db.User.findAll()
            .then(users => {
                res.render('./users/listadoUsuarios', {title: title, users: users});
            })
            .catch((error) => {
                console.log(error);
            });
    },


    login: (req,res) => {
        let title = 'Ingresá';
        res.render('users/login', {title: title});
    },

  //--------------------------------------------------------------------------------------------------------------------------------------------------  
    loginProcess: (req, res) => {
            let title = 'Ingresá';
            //let userToLogin = User.findByField('email',req.body.email);  //!Reeplazar por findbyPK-------------------------------------
            //let allUsers = db.User.findAll();
            //let userToLogin = allUsers[10];
            
           //console.log(allUsers[10]);


        db.User.findOne({
                where: {
                    email: req.body.email 
                }
                }).then(function(userToLogin){

                    //console.log(userToLogin);
                    //let userToLogin = allUsers[10];
                              


            //si se encuentra el mail ingresado en la base de datos
            if(userToLogin) {

               let isOkThePassword = bcryptjs.compareSync(req.body.password, userToLogin.password); //Compara usando encriptacion

               
              //si además está bien la contraseña               
			if (isOkThePassword) {
                
                
				delete userToLogin.password;
				req.session.userLogged = userToLogin; //guarda en sesion (del lado server) el usuario sin constraseña, la borró en la linea anterior
                
                //si está tidada la casilla de recordarme
				if(req.body.remember_user) {
					res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 60 })//crea una cookie y la guarda por: un minuto X 60 = una hora
				}

                //LISTO ACA ESTOY LOGEADO!!!! Por el momento redirigo a la pagina principal...
                return res.redirect('/users/profile'); //Listo! esta logueado
                //res.send('usuario logueado con exito');


            }

        

                // si encontro el usuario pero ingreso mal la contraseña
                return res.render('users/login', {title: title,
                    errors: {
                        email: {
                            msg: 'Las credenciales son inválidas'
                        }
                    }
                });
            }

            //si no se encuentra el usuario en la base de datos
            return res.render('users/login', {title: title,
                errors: {
                    email: {
                        msg: 'No se encuentra este email en nuestra base de datos'
                    }
                }
            });

                }).catch((error) => {
                    console.log('MENSAJE DE ERROR DE LA PROMESA DE BUSCAR USUARIO:  ' + error);
                });
  
    },



    register: (req,res) => {
        let title = 'Registrate';
        res.render('users/register', {title: title});
    },

    processRegister: (req, res) => {
        let title= 'Registrate';
       
       
        let validationsResult = validationResult(req);
        
        if (validationsResult.errors.length > 0) {
            return res.render('users/register' , { title: title, errors: validationsResult.mapped(), oldData: req.body})
        }

        //let userInDB = User.findByField('email', req.body.email);//-------------------------------- pendiente: reeeplazar busqueda en json por busqueda en BD
        db.User.findOne({
            where: {
                email: req.body.email 
            }
            }).then(function(userInDB){
        
       

		if (userInDB) {
           		return res.render('users/register', { title,
				errors: {
					email: {
						msg: 'Este email ya está registrado'
					}
				},
				oldData: req.body
			});
		}

		let userToCreate = {
			...req.body,
			password: bcryptjs.hashSync(req.body.password, 10),
			image: req.file.filename,
            category: 'client',
		}

       
       //------------------------------------------------------------nuevo: crea usr en base de datos
        db.User.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: bcryptjs.hashSync(req.body.password, 10),
            image: req.file.filename,
            category: 'client'
        })
            .then(() => {
                res.redirect('/users/login');
                delete userToCreate.confirmPassword
                let userCreated = User.create(userToCreate);
            })
            .catch((error) => {
                console.log(error);
            });
            //--------------------------------------------------fin

            delete userToCreate.confirmPassword

            let userCreated = User.create(userToCreate);

		return res.redirect('/users/login');

    }).catch((error) => {
        console.log('MENSAJE DE ERROR DE LA PROMESA DE VALIDAR USUARIO:  ' + error);
    });

    },

    profile: (req, res) => {
        let title = 'Perfil de usuario';
        res.render('users/userProfile', {title, user: req.session.userLogged});
    },

    editProfile: (req,res) => {
        let title = 'Editar Perfil';
        res.render('users/editProfile', {title, user: req.session.userLogged});
    },


    updateProfile: function (req,res) {
        console.log('guardando: '+req.body.email+ '--'+req.body.first_name+' '+req.body.last_name);
        db.User.update({
            first_name: req.body.first_name,
            last_name: req.body.last_name
        },{
            where: {
                email: req.body.email
            }
        })
            .then(() => {
                res.redirect('/users/profile');
                                //pendiente actualizar variable que contiene el usr de sesion...
                        })
            .catch((error) => {
                console.log('ERROR AL ACTUALIZAR DATOS: '+error);
            });

    },



    logout: (req, res) => {
        res.clearCookie('userEmail');
		req.session.destroy();
		return res.redirect('/');    
    }

};

module.exports = usersControllers;


