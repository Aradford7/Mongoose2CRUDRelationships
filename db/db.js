//connect to mongoose //require it
const mongoose = require('mongoose');
const connectionString = 'mongodb://localhost/photogallery'; //db called photogallery
//connect to mongoose
mongoose.connect(connectionString, {
    useNewUrlParser:true,
    useCreateIndex: true,
    useFindAndModify: false,
});

//check mongoose connection
mongoose.connection.on('connected', () => {
    console.log('mongoose connection to', connectionString);
})
mongoose.connection.on('disconnected', () => {
    console.log('mongoose disconnected to', connectionString);
});
mongoose.connection.on('error', (error) => {
    console.log('mongoose error', error);
});