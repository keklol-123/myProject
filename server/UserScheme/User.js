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
                unique: true,
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
user.pre('update', function (next) {
    console.log(this._conditions)
    const links = new Set(this.getUpdate().links.map(val => val.link))
    User.find
    let newLinks = [];
    
    links.forEach(link => {
        let price;
        this.links.forEach(val => {
            if (val.link == link)
                price = val.price;

        })
        newLinks.push({
            link: val,
            price: price
        })
    });
    console.log(newLinks)
    this.links = newLinks;
    next()
})


const User = mongoose.model("User", user);





module.exports = User;