const express = require('express')
const Router = express.Router();
const User = require('../../UserScheme/User');

const app = express();


Router.post('/', (req, res) => {
    const { email, password } = req.body;
  
    const user = new User({
      email,
      password,
    });
    user.save(err => {
      if (err) {
        console.error(err);
        res.status(500).send({
          message: 'error_registration',
          success: false,
        });
      } else {
        res.status(200).send({
          message: 'registered_successfully',
          success: true,
        });
      }
    });
  })

  module.exports = Router
