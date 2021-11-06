const { body } = require('express-validator');
const path = require('path');

const changePassValidations = [
    body('password').notEmpty().withMessage('Por favor escribe una contraseña'),
    body('confirmPassword').notEmpty().withMessage('Por favor confirma la contraseña').bail()
        .custom((value, { req }) => {
            if (req.body.confirmPassword !== req.body.password) {
                throw new Error('Las contraseñas no coinciden');
            }
            return true;
        }),


];

module.exports = changePassValidations;