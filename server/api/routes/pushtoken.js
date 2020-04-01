const express = require('express')
const Router = express.Router();
const request = require('request');

Router.post('/', (req, res) => {
    const { token } = req.body;
    request({
      url: 'https://fcm.googleapis.com/fcm/send',
      method: 'POST',
      headers: {
        'Content-Type' :' application/json',
        'Authorization': 'key=AAAADAyWGv4:APA91bFPYyNKSjY4jL-pive9O1gKBW_NmJz8iYmlSUW52LfbSs1uHc0emSQCo4jU0WZ2JKoemMqFmTXu2gWB2F81mN1mqhKA2X-go4yu2eYLQeDQ074eFp7nLL2fZpNis7iwcb4TIydV'
      },
      body: JSON.stringify(
        { "notification": {
          "title": "Ералаш",
          "body": "Начало в 21:00",
          "icon": "https://eralash.ru.rsz.io/sites/all/themes/eralash_v5/logo.png?width=40&height=40",
          "click_action": "http://eralash.ru/"
        },
          "to" : token
        }
      )
    }, function(error, response, body) {
      if (error) { 
        console.error(error, response, body); 
      }
      else if (response.statusCode >= 400) { 
        console.error('HTTP Error: '+response.statusCode+' - '+response.statusMessage+'\n'+body); 
      }
      else {
        console.log('Done!')
      }
    });
  })


module.exports = Router