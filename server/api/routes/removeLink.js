const express = require('express')
const Router = express.Router();
const User = require('../../UserScheme/User');


Router.post('/',  (req, res) => {
    const { token, linkToRemove } = req.body;
  
    User.findOne({
      "tokens.token": token
    })
      .update({
        "$pull": {
          "links": {
            "link" : linkToRemove,
          },
        },
      })
      .exec((err, user) => {
        console.log(user)
        if (err) {
          res.status(500).send({
            message: 'failed_to_delete',
            success: false,
          });
        } else {
          User.findOne({"tokens.token": token}, (err, updatedUser) => {
            res.status(200).send({
              links: updatedUser.links,
              message: 'remove_success',
              success: true,
            })
          })
          
        }
      });
  })


module.exports = Router