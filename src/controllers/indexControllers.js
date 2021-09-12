const path = require('path');

const fs = require('fs');

const productsFilePath = path.join(__dirname, '../data/products.json');


const indexControllers = {
    home: (req,res) => {
        let title = 'Sportland';
        let products = JSON.parse(fs.readFileSync(productsFilePath));
		let visitados =products.filter(i => i.flag == 'visited');
        //console.log(visitados);
	
        res.render('index', {title: title, productosVisitados: visitados});

    }
};

module.exports = indexControllers;