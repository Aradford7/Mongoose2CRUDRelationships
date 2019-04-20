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
//delete route!!!!
router.delete('/:id', (req,res) => {
    Singer.findByIdAndRemove(req.params.id, (err,deletedSinger) => {
        //delete songs from the singer via song model
        if(err){
        }else{
            console.log(deletedSinger, "<----deletedSinger ");
            Singer.deleteMany({
                _id:{
                    $in: deletedSinger.songs //creates array of song id thats able to delete
                }
            },(err, data) => {
                console.log(data, 'after removing')
                res.redirect('/singers');
            });
        }
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

//EDIT GET AND PUT REQUEST
router.get('/:id/edit', (req,res) => {
    Singer.findById(req.params.id, (err, foundSinger) => {
        res.render('singers/edit.ejs', {
            singer: foundSinger
        });
    });
});

router.put('/:id', (req,res) => {
    Singer.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedSinger) => {
        if (err){
            res.send(err, 'Singer Edit not updated');
        }else {
            res.redirect('/singers');
        }
    });
});


//module.exports
module.exports = router;