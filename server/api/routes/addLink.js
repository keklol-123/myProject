const express = require('express')
const Router = express.Router();
const User = require('../../UserScheme/User');

const getPrice = require('../../Parsing/Parser')

Router.post('/', async (req, res) => {
    const { newLink, token, name } = req.body;

    if(!token) return res.status(401).send({message: 'Unauthorized'});

    let price;
    const z = await getPrice(newLink).then(res => {
      price = res;
    });
    if(price == undefined){
      res.status(406).send({
        message: 'link_not_acceptable',
        success: false,
      });
      return;
    }
    User.findOne({
      "tokens.token": token
    })
      .update({'links.link' : {$ne: newLink }},{
        $push: {
          links: {
            link: newLink,
            price: price,
            name: name
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
          
          User.findOne({"tokens.token": token}, (err, updatedUser) => {
            res.status(200).send({
              links: updatedUser.links,
              message: 'add_success',
              success: true,
            })
          });
        }
      });
  })


  module.exports = Router