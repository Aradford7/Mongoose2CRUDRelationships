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
//post the new song
router.post('/', (req,res) => {
    Song.create(req.body, (err, createdSong) => {
        if(err, 'song not created'){
            res.send(err);
        }else{
            /////crazy stuff happening
            // finding the author that owns the article
            // req.body.authorId What is is coming from look at the new route, at the select menu
            // what is the name property
           Singer.findById(req.body.singerId, (err, foundSinger) => {
               console.log("==========================")
               console.log(foundSinger, "<======== found singer in songPost");
               console.log("==========================")
            //////more crazy stuff
            // after finding the author push the reference into the singers songs array
            //An array is defined in the model
            foundSinger.songs.push(createdSong);
            foundSinger.save((err, savedSinger) => {
                console.log('======================')
                console.log(savedSinger, '<-----savedSinger in the songs post route')
                console.log('========================')
                res.redirect('/songs');
            });
         });
        }
    });
});
//songs show route


//export
module.exports = router;