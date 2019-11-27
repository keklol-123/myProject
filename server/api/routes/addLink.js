const express = require('express')
const Router = express.Router();
const User = require('../../UserScheme/User');

const getPrice = require('../../Parsing/Parser')

Router.post('/', async (req, res) => {
    const { email, newLink, token } = req.body;

    if(!token) return res.status(401).send({message: 'Unauthorized'});

    

    let price;
    const z = await getPrice(newLink).then(res => {
      price = res;
    });
    User.findOne({
      "tokens.token": token
    })
      .update({'links.link' : {$ne: newLink }},{
        $push: {
          links: {
            link: newLink,
            price: price,
          },
        },
      })
      .exec((err, user) => {
        if (err) {
          res.status(500).send({
            message: 'addlink_failed',
            success: false,
          });
        } else if (user.nModified == 0) {
          res
            .status(401)
            .json({ message: 'link already exists' })
            .send();
        } else {
          res.status(200).send({
            message: 'add_success',
            success: true,
            link: newLink,
            price,
          });
        }
      });
  })


  module.exports = Router