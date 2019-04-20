const express = require('express')//require express and router
const router = express.Router();
const Singer = require('../models/singers'); //require singer model
const Song = require('../models/songs');//require song model

//console.log(Singer, "found singer object")

//render new page route
router.get('/new', (req,res) => {
    res.render('singers/new.ejs');
}); //so need singers folder and all files inside views
//new pages now renders add a index to redirect too!
//show route!!! before index bc /:id
router.get('/:id', (req,res) => {
    Singer.findById(req.params.id)
    //.populate('songs')
    .exec((err, foundSinger) => {
       // console.log(foundSinger, "<------foundSinger in show route")
        res.render('singers/show.ejs', {
            singer:foundSinger
        });
    });
});
//index route
router.get('/', (req, res) => {
    //show all singers
    Singer.find({}, (err, foundSingers) => {
        if(err){
            res.send(err)
        }else{
            res.render('singers/index.ejs', {
                singers:foundSingers
            })
        }
    });
});
// but it will need a post request to render it
//post request for index
router.post('/', (req, res) => {
    console.log(req.body, 'post route hit body');
    Singer.create(req.body, (err, createdSinger) => {
        if (err) {
            res.send(err);
        }else{
            res.redirect('/singers');
        }
    });
});

//module.exports
module.exports = router;