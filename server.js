const express = require('express');
const app = express();
//require express, npm init, npm i express, body-parser,
//method-override, mongoose and ejs
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const ejsLint = require('ejs-lint'); 

//require database
require('./db/db');
//add controllers here
const usersController = require('./controller/users');
const photosController = require('./controller/photos');
/////middleware here
app.use(bodyParser.urlencoded({extended:false}));
app.use(methodOverride('_method'));
ejsLint.lint()
/////////////////////

//require controllers//////
app.use('/users', usersController); 
app.use('/photos', photosController);
//need photo and users file in controller!
///////////////////////////

app.listen(3000, () => {
    console.log('listening... on port:', 3000);
});