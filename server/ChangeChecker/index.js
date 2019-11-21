const mongoose = require('mongoose');
const User = require('../UserScheme/User');
const getPrice = require('../Parsing/Parser')

const checkChanges = async () => {
    User.find({}, (err, users) => {
        users.forEach((user) => {
            user.links.forEach(async val => {
                let price = await getPrice(val.link)
                if (parseFloat(price) < parseFloat(val.price))
                    console.log(`Price decreased, now: ${price}`)
            })
        })
    })
} 




module.exports = checkChanges