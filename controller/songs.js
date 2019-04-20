//require express, router, Article, Song
const express = require('express');
const router = express.Router();
const Song = require('../models/songs');
const Singer = require('../models/singers');

//new route
router.get('/new', (req,res) => {
    Singer.find({}, (err, allSingers) => { //finding all singers and create select menu inside of songs/new
        if(err){
            res.send(err);
        }else{
            res.render('songs/new.ejs', {
                singers:allSingers
            });
        }
    });
});
//index route!
router.get('/', (req, res) =>{
    Song.find({}, (err, foundSongs) => {
        if(err){
            res.send(err, 'song not found');
        }else{
            res.render('songs/index.ejs', {
                songs: foundSongs
            });
        }
    });
});
//export
module.exports = router;