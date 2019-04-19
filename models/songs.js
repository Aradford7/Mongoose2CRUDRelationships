//require mongoose
const mongoose = require('mongoose');
//create schema for song lyrics
const songSchema = mongoose.Schema({
    title: String,
    lyrics: String,
});
//objectify model of song
const Song = mongoose.model('Song', songSchema);
//export song
module.exports = Song;