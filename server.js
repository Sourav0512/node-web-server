console.log('server.js fired up');
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();
// app.get('/',(request,response)=> response.send({name : 'Sourav Das' , age : 27 , profession : 'Software'}));

app.use(express.static(__dirname + '/public')); // dir to load static content from
hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine',hbs); // setting the view engine to HBS
hbs.registerHelper('getCapital',(text)=> text.toUpperCase());
hbs.registerHelper('getTimeStamp',()=> (new Date()));

 //middleware for Maintenance page
app.use((request,response,next)=>{
  response.render('maintenance.hbs',{
    Title : 'sorry for the inconvinience' ,
    maintain : 'maintenance going on'
  });
next();
});

app.use((request,response,next)=> {
  fs.appendFile('server.log',`${(new Date())} :  ${request.method} : ${request.url} ` + '\n'
                              ,(error) => {if(error) console.log('error occured')});
  next();
});
app.get('/about',(request,response) =>{response.render('about.hbs',{Title : 'About Title' ,Para : 'About Page'})});

app.get('/',(request,response) =>{response.render('home.hbs',{Title : 'Home Page', Para : 'some random body here'})});

app.listen(4000);
