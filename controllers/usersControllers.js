const path = require('path');

const usersControllers = {
    login: (req,res) => {
        let title = 'Ingresá';
        res.render('./users/login', {title: title});
    },

    register: (req,res) => {
        let title = 'Registrate';
        res.render('./users/register', {title: title});
    }
};

module.exports = usersControllers;