const mongoose = require('mongoose');
const User = require('../UserScheme/User');

const checkChanges = async () => {
    User.find({}, (err, users) => {
        users.forEach()
    })
} 

module.exports = checkChanges