console.log('server.js fired up');
const express = require('express');
const hbs = require('hbs');
var app = express();
// app.get('/',(request,response)=> response.send({name : 'Sourav Das' , age : 27 , profession : 'Software'}));

app.use(express.static(__dirname + '/public'));
app.set('view engine',hbs);
app.get('/',(request,response) =>{response.render('about.hbs',{Title : 'tempTitle' ,Para : 'some rando para here'})});
app.listen(3000);
