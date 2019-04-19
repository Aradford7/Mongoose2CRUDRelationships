const express = require('express')//require express and router
const router = express.Router();
const Singer = require('../models/singers'); //require singer model
const Song = require('../models/songs');//require song model

//render new page
router.get('/new', (req,res) => {
    res.render('singers/new.ejs');
}); //so need singers folder and all files inside views




//module.exports
module.exports = router;