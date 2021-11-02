const path = require('path');
const User = require('../models/userModel');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');

const usersControllers = {
    login: (req,res) => {
        let title = 'Ingresá';
        res.render('users/login', {title: title});
    },

  //--------------------------------------------------------------------------------------------------------------------------------------------------  
    loginProcess: (req, res) => {
            let title = 'Ingresá';
            let userToLogin = User.findByField('email',req.body.email);

            //si se encuentra el mail ingresado en la base de datos
            if(userToLogin) {
               //let isOkThePassword = false;

              // return res.send(userToLogin); //esto lo uso para validar el logui me muestra el usuario ingresado que se encontro en la base....
               let isOkThePassword = bcryptjs.compareSync(req.body.password, userToLogin.password); //Compara usando encriptacion

             // console.log('pass del formulario: req.body.password');
              //console.log(req.body.password);
              //console.log('pass de la base: userToLogin.password');
              //console.log(userToLogin.password);
              
               //let isOkThePassword = (req.body.password == userToLogin.password) ? true : false; //Compara sin encriptar (cuando este el register terminado lo cambio)
               
               //console.log('valor de isOkThePassword');
              // console.log(isOkThePassword);

               
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

        let userInDB = User.findByField('email', req.body.email);

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

        delete userToCreate.confirmPassword

		let userCreated = User.create(userToCreate);

		return res.redirect('/users/login');
    },

    profile: (req, res) => {
        let title = 'Perfil de usuario';
        res.render('users/userProfile', {title, user: req.session.userLogged});
    },

    logout: (req, res) => {
        res.clearCookie('userEmail');
		req.session.destroy();
		return res.redirect('/');    
    }

};

module.exports = usersControllers;


