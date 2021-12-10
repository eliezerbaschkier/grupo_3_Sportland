const express = require('express');
const router = express.Router();
const usersAPIController = require('../../controllers/api/usersAPIController');

//const upload = require('../middlewares/usersImageMW');
//const validations = require('../middlewares/registerValidationsMW');
//const authMiddleware = require('../middlewares/authMiddleware');
//const guestMiddleware = require('../middlewares/guestMiddleware');
//const User = require('../models/userModel');


//Rutas
//Listado de Usuarios
router.get('/', usersAPIController.userList);

router.get('/:id' ,usersAPIController.userDetail);


module.exports = router;