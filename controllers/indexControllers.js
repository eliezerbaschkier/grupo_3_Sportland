const path = require('path');

const indexControllers = {
    home: (req,res) => {
        let title = 'Sportland';
        res.render('index', {title: title});
    }
};

module.exports = indexControllers;