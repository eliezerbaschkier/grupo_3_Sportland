const express = require('express');
const app = express();
const path = require('path');
const publicPath = path.resolve(__dirname, './')
console.log(publicPath);

//app.listen()