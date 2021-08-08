const express = require('express');
const app = express();
const path = require('path');
const publicPath = path.resolve(__dirname, './')

app.use(express.static(publicPath));

app.listen(3000, () => {
    console.log('Server running on port 3000');
})

//GET

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