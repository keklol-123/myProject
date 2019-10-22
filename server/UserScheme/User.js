const mongoose = require('mongoose');

const user = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    links: {
        type: [{
            link: String,
            price: String
        }],
        validate: {
            validator: function(array) {
                console.log(array)
                return array.map(val => val.link).length === new Set(array.map(val => val.link)).size;
              }
        }
    },
});



const User = mongoose.model("User", user);



module.exports = User;