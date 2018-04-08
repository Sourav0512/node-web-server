console.log('server.js fired up');
const express = require('express');
const hbs = require('hbs');
var app = express();
// app.get('/',(request,response)=> response.send({name : 'Sourav Das' , age : 27 , profession : 'Software'}));

app.use(express.static(__dirname + '/public')); // dir to load static content from
hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine',hbs); // setting the view engine to HBS
hbs.registerHelper('getCapital',(text)=> text.toUpperCase());
app.get('/about',(request,response) =>{
                                      response.render('about.hbs',{Title : 'About Title' ,Para : 'About Page'
                                      ,FooterData : `Copyright by Sourav Das @ ${(new Date()).getFullYear()}`
                                      })
                                      });

app.get('/',(request,response) =>    {
                                      response.render('home.hbs',{Title : 'Home Page', Para : 'some random body here',                                      ra : 'Some Body here',
                                      FooterData : `Copyright by Sourav Das @ ${(new Date()).getFullYear()}`
                                      })
                                      });

app.listen(4000);
