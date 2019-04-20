//require express,router, both model objects
const express = require('express');
const router = express.Router();
const Photo = require('../models/photos');
const User  = require('../models/users');

router.get('/new', (req, res)=>{
  // 1.finding all the users 
  //2. create the select menu inside of photos/new
  User.find({}, (err, allUsers) => {
    if(err){
      res.send(err);
    } else {
      res.render('photos/new.ejs', {
        users: allUsers
      });
    }
  });

});


router.get('/', (req, res)=>{
  Photo.find({}, (err, foundPhotos)=>{
    if(err){
      res.send(err);
    } else {
      res.render('photos/index.ejs', {
        photos: foundPhotos
      });
    }
  });
});

router.post('/', (req, res)=>{
  Photo.create(req.body, (err, createdPhoto)=>{
    if(err){
      res.send(err);
    } else {

       //  finding the user correlates  to photo
      // req.body.userId What is is coming from look at the new route, at select menu
      
      User.findById(req.body.userId, (err, foundUser) => {
        console.log("===========================")
        console.log(foundUser, "<=== found user in photo Post");
        console.log("===========================")

        foundUser.photos.push(createdPhoto);
        foundUser.save((err, savedUser) => {
          console.log('============================')
          console.log(savedUser, ' <---------- savedUser in photo post route');
          console.log('============================')
          res.redirect('/photos');
        });

      });


    }
  });
});

// photos show route
router.get('/:id', (req, res)=>{
  // req.params.id is the photos id
  User.findOne({'photos': req.params.id})
    .populate({path: 'photos', match: {_id: req.params.id}})
    .exec((err, foundUser) => {
      if(err){
        res.send(err)
        }else{
          
          console.log(foundUser, "<---- found the user in photo show route");
          res.render('photos/show.ejs', {
            user:foundUser,
            photo:foundUser.photos[0]})
     }})});

router.get('/:id/edit', (req, res)=>{
 
  User.find({}, (err, allUsers) => {
    User.findOne({'photos': req.params.id})
      .populate({path: 'photos', match: {_id: req.params.id}})
      .exec((err, foundPhotoUser) => {
        console.log(foundPhotoUser, "<==== foundphotouser")
        if(err){
          res.send(err);
        } else {
          res.render('photos/edit.ejs', {
            photo: foundPhotoUser.photos[0],
            users: allUsers,
            photoUser: foundPhotoUser
          })
        }
      })

  })
});

router.put('/:id', (req, res)=>{
 
  Photo.findByIdAndUpdate(req.params.id, req.body, {new: true},(err, updatedPhoto)=>{
    User.findOne({'photos': req.params.id}, (err, foundUser) => {

      if(foundUser._id.toString() !== req.body.UserId){
      
        foundPhotoUser.photos.remove(req.params.id);
       
        foundUser.save((err, savedFoundUser) => {
       
          user.findById(req.body.userId, (err, newUser) => {

            newUser.photos.push(updatedPhoto);
            newUser.save((err, savedNewUser) => {
              res.redirect('/photos/' + req.params.id);
            })

          })

        })
      } else {
       
    
        res.redirect('/photos/' + req.params.id)
      }


    })



  });
});

router.delete('/:id', (req, res)=>{
  Photo.findByIdAndRemove(req.params.id, (err, deletedPhoto)=>{

    User.findOne({'photos': req.params.id}, (err, foundUser) => {
      if(err){
        res.send(err);
      } else {
        console.log(foundUser, "<---- foundUser in delete before I remove the photo id")
        foundUser.photos.remove(req.params.id);
        // since we just mutated our document ^ , now we have to save
        foundUser.save((err, updatedUser) => {
          console.log(updatedUser, ' after the mutation');
          res.redirect('/photos');
        });
      }
    });
  });
});
module.exports = router;