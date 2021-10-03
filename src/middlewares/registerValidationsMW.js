const { body } = require('express-validator');
const path = require('path');

const validations = [
    body('first_name').notEmpty().withMessage('Por favor escribe tu nombre'),
    body('last_name').notEmpty().withMessage('Por favor escribe tu apellido'),
    body('email')
        .notEmpty().withMessage('Por favor escribe tu email').bail()
        .isEmail().withMessage('Por favor escribe un formato válido de email'),
    body('password').notEmpty().withMessage('Por favor escribe una contraseña'),
    body('image').custom((value, { req }) => {
        let file = req.file;
        let acceptedExtensions = ['.jpg', '.png', '.jpeg'];
        if (!file) {
            throw new Error('Tienes que subir una imagen');
        } else {
            let fileExtension = path.extname(file.originalname);
            if (!acceptedExtensions.includes(fileExtension)) {
                throw new Error(`Los formatos permitidos son ${acceptedExtensions.join(', ')}`);
            }
        }

        return true;
    })

];

module.exports = validations;