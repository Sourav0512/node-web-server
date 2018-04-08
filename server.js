console.log('server.js fired up');
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const yargs = require('yargs');
var app = express();

var argv = yargs
          .command('sustain','site goes to workshop')
          .option({
            sustain : {
                demand : false,
                alias : 's',
                describe : 'the site requires it'
            }
          })
          .help()
          .alias('help','h')
          .argv;
if (argv.sustain == "ok") {
  app.use((request,response,next)=>{
  response.render('maintenance.hbs',
  {
    Title : 'sorry for the inconvinience' ,
    maintain : 'maintenance going on'
  });
  //next();
  });
}
hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine',hbs); // setting the view engine to HBS
hbs.registerHelper('getCapital',(text)=> text.toUpperCase());
hbs.registerHelper('getTimeStamp',()=> (new Date()));
app.use((request,response,next)=> {
  fs.appendFile('server.log',`${(new Date())} :  ${request.method} : ${request.url} ` + '\n'
                              ,(error) => {if(error) console.log('error occured')});
  next();
});
//middleware for Maintenance page
if (argv.sustain === 'true') {
  app.use((request,response,next)=>{
    response.render('maintenance.hbs',{
      Title : 'sorry for the inconvinience' ,
      maintain : 'maintenance going on'
    });
  //next();
  });}
app.use(express.static(__dirname + '/public')); // dir to load static content from
app.get('/about',(request,response) =>{response.render('about.hbs',{Title : 'About Title' ,Para : 'About Page'})});
app.get('/',(request,response) =>{response.render('home.hbs',{Title : 'Home Page', Para : 'some random body here'})});
app.listen(4000);
