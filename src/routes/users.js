const express = require('express');
const router = express.Router();
const usersControllers = require('../controllers/usersControllers');

//const {body} = require('express-validator');//gregado cb

/*const validaciones= [
    body('email').isEmail().withMessage ( 'Debe ingresar un email valido' ),
    body('contraseña').isLength({ min : 8 }).withMessage( 'La contraseña debe tener al menos 8 caracteres' ),
];*/

router.get('/login', usersControllers.login);
//router.post('/login',validaciones,usersControllers.login);//agregado christian...


//Procesar el Login (hacer validaciones y buscar el usuario ingresado..)
router.post('/login', usersControllers.loginProcess);

router.get('/register', usersControllers.register);

module.exports = router;

