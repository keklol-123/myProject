const User = require('./User')


const changePrice = (newPrice, link) => {
    User.update(
      {
        'links.link': link,
      },
      {
        $set: {
          'links.$.price': newPrice,
        },
      },
      (err, res) => {
        if (err) console.log(err);
        else console.log(res);
      },
    );
  };


  module.exports = changePrice;