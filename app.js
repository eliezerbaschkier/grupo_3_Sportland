const express = require('express');
const app = express();
const path = require('path');
const publicPath = path.resolve(__dirname, './')

app.use(express.static(publicPath));

app.listen(3000, () => {
    console.log('Server running on port 3000');
})

app.get('/', (req,res) => {
    let pathHome = path.resolve(publicPath, './views/index.html');
    res.sendFile(pathHome);
})