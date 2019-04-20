const express = require('express');
const app = express();
//require express, npm init, npm i express, body-parser,
//method-override, mongoose and ejs
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const ejsLint = require('ejs-lint'); //ejs lint CUZ IM SICK OF TYPOS :(

//require database
require('./db/db');
//add controllers here
const singersController = require('./controller/singers');
const songsController = require('./controller/songs');
/////middleware here
app.use(bodyParser.urlencoded({extended:false}));
app.use(methodOverride('_method'));
ejsLint.lint()
/////////////////////

//require controllers//////
app.use('/singers', singersController); //err forgot to const the controller
app.use('/songs', songsController);
//need song and singers file in controller!
///////////////////////////

app.listen(3000, () => {
    console.log('listening... on port:', 3000);
});