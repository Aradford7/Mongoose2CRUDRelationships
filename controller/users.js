const express = require('express')//require express and router
const router = express.Router();
const User = require('../models/users'); //require user model
const Photo = require('../models/photos');//require photo model

//console.log(User, "found user object")

//render new page route//user/new
router.get('/new', (req,res) => {
    res.render('users/new.ejs');
}); //find the photo by user
router.get('/:id', (req,res) => {
    User.findById(req.params.id)
    .populate('photos')
    .exec((err, foundUser) => {
       console.log(foundUser, "<------found User in show route")
        res.render('users/show.ejs', {
            user:foundUser
        });
    });
});
//delete route!!!!
router.delete('/:id', (req,res) => {
    User.findByIdAndRemove(req.params.id, (err,deletedUser) => {
        if(err){
        }else{
            console.log(deletedUser, "<----deleted User ");
            User.deleteMany({
                _id:{
                    $in: deletedUser.photos //creates array of photos id thats able to delete
                }
            },(err, data) => {
                console.log(data, 'after removing')
                res.redirect('/users');
            });
        }
    });
});
//index route
router.get('/', (req, res) => {
    //show all users
    User.find({}, (err, foundUsers) => {
        if(err){
            res.send(err)
        }else{
            res.render('users/index.ejs', {
                users:foundUsers
            })
        }
    });
});
// post request to render it
//post request for index
router.post('/', (req, res) => {
    console.log(req.body, 'post route hit body');
    User.create(req.body, (err, createdUser) => {
        if (err) {
            res.send(err);
        }else{
            res.redirect('/users');
        }
    });
});

//EDIT GET AND PUT REQUEST
router.get('/:id/edit', (req,res) => {
    User.findById(req.params.id, (err, foundUser) => {
        res.render('users/edit.ejs', {
            user: foundUser
        });
    });
});

router.put('/:id', (req,res) => {
    User.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedUser) => {
        if (err){
            res.send(err, 'User Edit is not updated');
        }else {
            res.redirect('/users');
        }
    });
});


//module.exports
module.exports = router;