const path = require('path');
const User = require('../models/userModel');

const usersControllers = {
    login: (req,res) => {
        let title = 'Ingresá';
        res.render('users/login', {title: title});
    },

    
    loginProcess: (req, res) => {
let userToLogin = User.findByField('email',req.body.email);

console.log(userToLogin);
return res.send(userToLogin);

    
    },



    register: (req,res) => {
        let title = 'Registrate';
        res.render('users/register', {title: title});
    }
};

module.exports = usersControllers;


