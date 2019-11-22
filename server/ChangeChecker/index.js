const mongoose = require('mongoose');
const User = require('../UserScheme/User');
const getPrice = require('../Parsing/Parser');
const changePrice = require('../UserScheme/ChangePrice');

const checkChanges = async () => {
  User.find({}, (err, users) => {
    if (err) {
      console.log(err);
      return;
    }

    users.forEach(user => {
      user.links.forEach(async val => {
        let price = await getPrice(val.link);
        if (parseFloat(price) < parseFloat(val.price)){
            changePrice(price, val.link);
            console.log(`Price changed: ${price}, item: ${val.link}`);
        }
      });
    });
  });
};

module.exports = checkChanges;
