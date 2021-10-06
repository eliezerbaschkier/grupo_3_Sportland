const express = require('express');
const app = express();
const routesIndex = require('./routes/index');
const routesProducts = require('./routes/products');
const routesUsers = require('./routes/users');
const path = require('path');
const publicPath = path.join(__dirname, '../public');
const methodOverride = require('method-override');
const session = require('express-session');
const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware');

app.use(session({
    secret: 'It is a secret',
    resave: false,
    saveUninitialized: false
}));

app.use(userLoggedMiddleware);
app.use(express.static(publicPath));
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(express.urlencoded({ extended : false}));
app.use(express.json());

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