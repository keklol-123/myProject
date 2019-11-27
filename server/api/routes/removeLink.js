const express = require('express')
const Router = express.Router();
const User = require('../../UserScheme/User');


Router.post('/', (req, res) => {
    const { token, linkToRemove } = req.body;
  
    User.findOne({
      "tokens.token": token
    })
      .update({
        $pull: {
          links: {
            link: linkToRemove,
          },
        },
      })
      .exec((err, _) => {
        if (err) {
          res.status(500).send({
            message: 'failed_to_delete',
            success: false,
          });
        } else {
          res.status(200).send({
            message: 'delete_successfully',
            success: true,
          });
        }
      });
  })


module.exports = Router