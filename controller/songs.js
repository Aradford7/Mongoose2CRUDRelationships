//require express,router, both model objects
const express = require('express');
const router = express.Router();
const Song = require('../models/songs');
const Singer  = require('../models/singers');

router.get('/new', (req, res)=>{
  // finding all the singers to create the select menu inside of songs/new
  Singer.find({}, (err, allSingers) => {
    if(err){
      res.send(err);
    } else {
      res.render('songs/new.ejs', {
        singers: allSingers
      });
    }
  });

});


router.get('/', (req, res)=>{
  Song.find({}, (err, foundSongs)=>{
    if(err){
      res.send(err);
    } else {
      res.render('songs/index.ejs', {
        songs: foundSongs
      });
    }
  });
});

router.post('/', (req, res)=>{
  Song.create(req.body, (err, createdSong)=>{
    if(err){
      res.send(err);
    } else {

       //  finding the singer correlates  to song
      // req.body.singerId What is is coming from look at the new route, at select menu
      
      Singer.findById(req.body.singerId, (err, foundSinger) => {
        console.log("===========================")
        console.log(foundSinger, "<=== found singer in song Post");
        console.log("===========================")

        // after we found the singer push the reference into the singers songs array
            // What is the array? Its the thing we defined in the model
        foundSinger.songs.push(createdSong);
        foundSinger.save((err, savedSinger) => {
          console.log('============================')
          console.log(savedSinger, ' <---------- savedsinger in song post route');
          console.log('============================')
          res.redirect('/songs');
        });

      });


    }
  });
});

// songs show route
router.get('/:id', (req, res)=>{
  // req.params.id is the songs id
  Singer.findOne({'songs': req.params.id})
    .populate({path: 'songs', match: {_id: req.params.id}})
    .exec((err, foundSinger) => {
      if(err){
        res.send(err)
        }else{
          
          console.log(foundSinger, "<---- found the singer in song show route");
          res.render('songs/show.ejs', {
            singer:foundSinger,
            song:foundSinger.songs[0]})
     }})});

router.get('/:id/edit', (req, res)=>{
   // For the edit, we need to allow the user to Select all the singers when they are editing the
  // singer, thats why we are performing singer.find

  // then we need to find the song and the singer who owns the song that we
  // are trying to edit
  // thats why we are using singer.findOne
  // we are using .populate to find all the songs
  // we use match, to only populate the song that matches the song we are trying to edit
  Singer.find({}, (err, allSingers) => {
    Singer.findOne({'songs': req.params.id})
      .populate({path: 'songs', match: {_id: req.params.id}})
      .exec((err, foundSongSinger) => {
        console.log(foundSongSinger, "<==== foundsongsinger")
        if(err){
          res.send(err);
        } else {
          res.render('songs/edit.ejs', {
            song: foundSongSinger.songs[0],
            singers: allSingers,
            songSinger: foundSongSinger
          })
        }
      })

  })
});

router.put('/:id', (req, res)=>{
 //if the singer is changed,
 // 1 . then the song goes into a different singer's array
 // 2. and is removed from the original singer's array of songs
  Song.findByIdAndUpdate(req.params.id, req.body, {new: true},(err, updatedSong)=>{
    // find the singer that owns the song
    Singer.findOne({'songs': req.params.id}, (err, foundSinger) => {

      if(foundSinger._id.toString() !== req.body.SingerId){
        // so if I'm inside of the if
        // that means the client sent a request with the singer changed
        foundSinger.songs.remove(req.params.id);
        // removed the song ref from the original singer above
        foundSinger.save((err, savedFoundSinger) => {
          // Find the new singer and add the song reference to its songs array
          singer.findById(req.body.singerId, (err, newSinger) => {

            // updated song is ref in the song query at the top
            newSinger.songs.push(updatedSong);
            newSinger.save((err, savedNewSinger) => {
              res.redirect('/songs/' + req.params.id);
            })

          })

        })
      } else {
        // if the singer didn't change everything was taken care of in
    
        res.redirect('/songs/' + req.params.id)
      }


    })



  });
});

router.delete('/:id', (req, res)=>{
  Song.findByIdAndRemove(req.params.id, (err, deletedSong)=>{

    // find the singer and then remove the songs id from their songs array of ids
    Singer.findOne({'songs': req.params.id}, (err, foundSinger) => {
      if(err){
        res.send(err);
      } else {
        console.log(foundSinger, "<---- foundSinger in delete before I remove the song id")
        foundSinger.songs.remove(req.params.id);
        // since we just mutated our document ^ , now we have to save
        foundSinger.save((err, updatedSinger) => {
          console.log(updatedSinger, ' after the mutation');
          res.redirect('/songs');
        });
      }
    });
  });
});
module.exports = router;