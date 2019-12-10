const express = require('express');
const Router = express.Router();
const User = require('../../UserScheme/User');
const jwt = require('jsonwebtoken');

const secret = 'pricewatcher';

Router.post('/', (req, res) => {
  const { email, password } = req.body;
  User.findOne(
    {
      email,
    }
  ).exec((err, user) => {
    
    if (err) {
      res.status(500).send({
        message: 'login_failed',
        success: false,
      });}

    else if(!user) {
      return res.status(401).send({msg: 'Wrong email or password'})
    }
     else {
      user.isCorrectPassword(password,(err, same) => {
        if (err) {
          return res.status(500).json({
            message: 'Internal error, please try again',
            success: false,
          });
        }
        else if (!same) {
          return res.status(401).json({
            message: 'incorrect email or password',
            success: false,
          });
        }
        else {
          const payload = { email: user.email };

          const token = jwt.sign(payload, secret, {
            expiresIn: '24h',
          });

          User.findOneAndUpdate(
            { email: user.email },
            {
              $push: {
                tokens: { token: token },
              },
            },
          ).exec((err, res) => {
            if (err) console.log(err);
          });
          res.status(200).send({ links: user.links, token: token });
        }
      })
    }
  });
});

module.exports = Router;
