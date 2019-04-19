//require express, router, Article, Song
const express = require('express');
const router = express.Router();
const Song = require('../models/songs');
const Singer = require('../models/singers');

//new route
router.get('/new', (req,res) => {
    Singer.find({}, (err, allSingers) => {
        if(err){
            res.send(err);
        }else{
            res.render('songs/new.ejs', {
                singers:allSingers
            });
        }
    });
});

//export
module.exports = router;