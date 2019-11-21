const mongoose = require('mongoose');

const user = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    links: {
        type: [{
            link: {
                type: String
            },
            price: {
                type: String,
                required: true
            }
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