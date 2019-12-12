const User = require('../UserScheme/User');
const getPrice = require('../Parsing/Parser');
const changePrice = require('../UserScheme/ChangePrice');
const sendMail = require('../Mail/Mailer');

const checkChanges = async () => {
  User.find({}, (err, users) => {
    if (err) {
      console.log(err);
      return;
    }

    users.forEach(user => {
      user.links.forEach(async val => {
        let price = await getPrice(val.link);
        if (parseFloat(price) < parseFloat(val.price)) {
          const mailText = `Price changed: <br/> was: ${val.price} <br/> now: ${price} <br/> item: ${val.link}`;

          changePrice(price, val.link);
          sendMail(user.email, mailText);
          
          console.log(`Price changed: ${price}, item: ${val.link}`);
        }
      });
    });
  });
};

module.exports = checkChanges;
