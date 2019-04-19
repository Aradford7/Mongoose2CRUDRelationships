const mongoose = require ('mongoose');
const Song =  require('./songs');
//need to require mongoose and other models song
const singerSchema =  new mongoose.Schema({
    name: String,
    songs: [{type: mongoose.Schema.Types.ObjectId, ref: 'Song'}]
});

const Singer = mongoose.model('Singer', singerSchema);
//make model into Object for Singer
//export
module.export = Singer;