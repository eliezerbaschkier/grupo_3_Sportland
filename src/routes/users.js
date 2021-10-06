const express = require('express');
const router = express.Router();
const usersControllers = require('../controllers/usersControllers');
const upload = require('../middlewares/usersImageMW');
const validations = require('../middlewares/registerValidationsMW');
const authMiddleware = require('../middlewares/authMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');

//const {body} = require('express-validator');//gregado cb

/*const validaciones= [
    body('email').isEmail().withMessage ( 'Debe ingresar un email valido' ),
    body('contraseña').isLength({ min : 8 }).withMessage( 'La contraseña debe tener al menos 8 caracteres' ),
];*/

router.get('/login', guestMiddleware , usersControllers.login);
//router.post('/login',validaciones,usersControllers.login);//agregado christian...


//Procesar el Login (hacer validaciones y buscar el usuario ingresado..)
router.post('/login', usersControllers.loginProcess);

router.get('/register', guestMiddleware , usersControllers.register);
router.post('/register', upload.single('image'), validations, usersControllers.processRegister);

// User profile
router.get('/profile', authMiddleware, usersControllers.profile);

// Logout
router.get('/logout', usersControllers.logout);


module.exports = router;

