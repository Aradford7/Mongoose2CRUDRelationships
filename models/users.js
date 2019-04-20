const mongoose = require ('mongoose');
//const Photo =  require('./photos');
//need to require mongoose and other models photo
const userSchema =  new mongoose.Schema({
    name: String,
    photos: [{type: mongoose.Schema.Types.ObjectId, ref: 'Photo'}]
});

const User = mongoose.model('User', userSchema);
//make model into Object for User
//export

module.exports = User;