const mongoose = require('mongoose');

const user = mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    password: String,
    links: [String],

});

const User = mongoose.model("User", user);



module.exports = User;