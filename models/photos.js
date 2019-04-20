//require mongoose
const mongoose = require('mongoose');
//create schema for photo
const photoSchema = mongoose.Schema({
    title: String,
    img: String,
});
//objectify model of song
const Photo = mongoose.model('Photo', photoSchema);
//export song
module.exports = Photo;