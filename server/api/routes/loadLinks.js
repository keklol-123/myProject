const express = require('express')
const Router = express.Router();
const User = require('../../UserScheme/User');
const jwt = require('jsonwebtoken');


Router.post('/', (req, res) => {
    const { token } = req.body;
  
    User.findOne({ 'tokens.token': token }, (err, user) => {
      if (err) console.log(err);
      else if(!user) {
        res.status(401).send({message: 'Token not valid'})
      }
      else res.status(200).send(user);
    });
  })


module.exports = Router