const path = require('path');
const User = require('../models/userModel');

const usersControllers = {
    login: (req,res) => {
        let title = 'Ingresá';
        res.render('users/login', {title: title});
    },

    
    loginProcess: (req, res) => {
        let title = 'Ingresá';
let userToLogin = User.findByField('email',req.body.email);

//si se encuentra el mail ingresado en la base de datos
if(userToLogin) {

    return res.send(userToLogin);

}

//si no se encuentra el usuario en la base de datos
return res.render('users/login', {title: title,
    errors: {
        email: {
            msg: 'No se encuentra este email en nuestra base de datos'
        }
    }
});



//return res.send(userToLogin);

    
    },



    register: (req,res) => {
        let title = 'Registrate';
        res.render('users/register', {title: title});
    }
};

module.exports = usersControllers;


