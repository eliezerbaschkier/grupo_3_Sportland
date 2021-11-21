const express = require('express');
const router = express.Router();
const usersControllers = require('../controllers/usersControllers');

const upload = require('../middlewares/usersImageMW');
const validations = require('../middlewares/registerValidationsMW');
const authMiddleware = require('../middlewares/authMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');
const User = require('../models/userModel');



router.get('/login', guestMiddleware , usersControllers.login);
//router.post('/login',validaciones,usersControllers.login);//agregado christian...


//Procesar el Login (hacer validaciones y buscar el usuario ingresado..)
router.post('/login', usersControllers.loginProcess);

router.get('/register', guestMiddleware , usersControllers.register);
router.post('/register', upload.single('image'), validations, usersControllers.processRegister);

// User profile
router.get('/profile', authMiddleware, usersControllers.profile);

//Editar perfil de usuario
router.get('/editProfile', authMiddleware, usersControllers.editProfile);
router.post('/updateProfile', upload.single('image'), validations,usersControllers.updateProfile);

router.post('/updateFoto', upload.single('image'), validations, usersControllers.updateFoto);
router.get('/cambiarFoto', usersControllers.cambiarFoto);

router.post('/updatePass', upload.single('image'), validations, usersControllers.updatePass);
router.get('/cambiarPass', usersControllers.cambiarPass);

// Logout
router.get('/logout', usersControllers.logout);
router.get('/listadoUsuarios',usersControllers.userList);


module.exports = router;

