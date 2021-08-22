const express = require('express');
const app = express();
const routesIndex = require('./routes/index');
const routesProducts = require('./routes/products');
const routesUsers = require('./routes/users');
const path = require('path');
const publicPath = path.resolve(__dirname, './');

app.use(express.static(publicPath));
app.set('view engine', 'ejs');

app.listen(3000, () => {
    console.log('Server running on port 3000');
})

app.use('/', routesIndex);
app.use('/products', routesProducts);
app.use('/users', routesUsers)

//GET

/*
app.get('/', (req,res) => {
    let pathHome = path.resolve(publicPath, './views/index.html');
    res.sendFile(pathHome);
})

app.get('/login', (req,res) => {
    let pathLogin = path.resolve(publicPath, './views/login.html');
    res.sendFile(pathLogin);
})

app.get('/register', (req,res) => {
    let pathRegister = path.resolve(publicPath, './views/register.html');
    res.sendFile(pathRegister);
})

app.get('/productDetail', (req,res) => {
    let pathProductDetail = path.resolve(publicPath, './views/productDetail.html');
    res.sendFile(pathProductDetail);
})

app.get('/productCart', (req,res) => {
    let pathProductCart = path.resolve(publicPath, './views/productCart.html');
    res.sendFile(pathProductCart);
})

//POST

app.post('/', (req,res) => {
    let pathHome = path.resolve(publicPath, './views/index.html');
    res.sendFile(pathHome);
})

app.post('/productDetail', (req,res) => {
    let pathProductDetail = path.resolve(publicPath, './views/productDetail.html');
    res.sendFile(pathProductDetail);
})

app.post('/productCart', (req,res) => {
    let pathProductCart = path.resolve(publicPath, './views/productCart.html');
    res.sendFile(pathProductCart);
})

*/