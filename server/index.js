const express = require("express");
const mongoose = require("mongoose");
const path = require("path")

const User = require('./User')
const app = express();

mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);


mongoose.connect(`mongodb+srv://gleb:glebgleb@mypetdb-mp6fc.mongodb.net/test?retryWrites=true&w=majority`,
(err) => {
    if (err)
        console.log(err);
    else
        console.log("Connected to DB");
})

const temp = new User({
    email: 'mail@mail.ru',
    password: '123346',
    links: [
        'yahoo.com',
        'google.com'
    ]
}).save();



app.use(express.static(__dirname + "/../public"));
 
app.use("/", function(request, response){
     
    response.sendFile(path.resolve(__dirname, '/../public/index.html'))
});
 
app.listen(3000);