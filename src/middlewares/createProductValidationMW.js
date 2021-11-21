const { body } = require('express-validator');
const path = require('path');

const productsValidations = [
    body('name').notEmpty().isLength({min: 5 }).withMessage('El nombre del producto es obligatorio. Largo minimo 5 caracteres.'), //validacion de nombre de producto. Es obligatorio y debe contener por lo menos 5 caracteres...
    body('description').notEmpty().isLength({min: 20 }).withMessage('Ingresar al menos 20 caracteres para descripcion.'),//validacion de la descripcion. minimo 20 caracteres...
    body('price').notEmpty().isNumeric().withMessage('Ingresar un valor numerico Válido'),  //debe ser un numero...
    body('image').custom((value, { req }) => {  //Validacion de imagen. Solo soporta archivos jpeg, jpg, png o GIF.
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

module.exports = productsValidations;