const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const api = require('./server/routes/api');

const port=3000;

const app=express();
app.use(express.static(path.join(__dirname, 'build')));

app.use(bodyParser.urlencoded({extended:true}));

app.use(bodyParser.json());
app.use(bodyParser({limit: '50mb'}));

app.use('/api',api);

app.get("*",(req,res) => {
    // res.send('api works');
    debugger
    res.sendFile(path.join(__dirname, 'build', 'index.html'));

});

app.listen(port,function () {
console.log('server is listening at localhost: '+port);
});