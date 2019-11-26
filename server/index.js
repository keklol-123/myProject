const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const User = require('./UserScheme/User');
const getPrice = require('./Parsing/Parser');
const withAuth = require('./Middleware/middleware');
const app = express();

const secret = 'pricewatcher'

app.use(cookieParser())

mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useCreateIndex', true);

app.post('/signup', bodyParser.json(), (req, res) => {
  const { email, password } = req.body;

  console.log(email, password);

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
});

app.post('/login', bodyParser.json(), (req, res) => {
  const { email, password } = req.body;

  User.findOne(
    {
      email,
    },
    (err, user) => {
      if (err) {
        console.log(err);
        res.status(500).json({
          message: 'logined_successfully',
          success: true,
        });
      } else if (!user) {
        res.status(401).json({
          message: 'incorrect email or password',
          success: false,
        });
      } else {
        user.isCorrectPassword(password, (err, same) => {
          if (err) {
            res.status(500).json({
              message: 'Internal error, please try again',
              success: false,
            });
          } else if (!same) {
            res.status(401).json({
              message: 'incorrect email or password',
              success: false,
            });
          } 
        });
      }
    },
  ).exec((err, user) => {
    if (err) {
      console.log(err);
      res.status(500).send({
        message: 'login_failed',
        success: false,
      });
    } else {
      const payload = {user};
            const token = jwt.sign(payload, secret, {
              expiresIn: '24h',
            });
      User.findOneAndUpdate({email: user.email},{$push: {
        tokens: {token: token}
      }}).exec((err, res) => {
        if (err)
          console.log(err)
        else 
          console.log(res)
      })
      res.cookie('token', token, { httpOnly: true }).status(200).send(user);

     
    }
  });
});

app.post('/checkToken',bodyParser.json() ,(req, res) => {
  const {token} = req.body;

  User.findOne({'tokens.token': token}, (err, user) => {
    if(err)
      console.log(err);
    else 
      res.status(200).send(user.links)
  })
})

app.post('/addlink', bodyParser.json(), async (req, res) => {
  const { email, password, newLink } = req.body;
  let price;
  const z = await getPrice(newLink).then(res => {
    price = res;
  });
  User.findOne({
    email,
  })
    .update({
      $push: {
        links: {
          link: newLink,
          price: price,
        },
      },
    })
    .exec((err, user) => {
      if (err) {
        console.log(err);
        res.status(500).send({
          message: 'addlink_failed',
          success: false,
        });
      } else {
        res.status(200).send({
          message: 'add_success',
          success: true,
        });
      }
    });
});

app.post('/removelink', bodyParser.json(), (req, res) => {
  const { email, password, linkToRemove } = req.body;

  User.findOne({
    email,
    password,
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
        console.log(err);
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
});

async function start() {
  try {
    await mongoose.connect(
      `mongodb://gleb:glebgleb@mypetdb-shard-00-00-mp6fc.mongodb.net:27017,mypetdb-shard-00-01-mp6fc.mongodb.net:27017,mypetdb-shard-00-02-mp6fc.mongodb.net:27017/test?ssl=true&replicaSet=myPetDB-shard-0&authSource=admin&retryWrites=true&w=majority`,
      err => {
        if (err) console.log(err);
        else console.log('Connected to DB');
      },
    );
    app.listen(3000);
  } catch (e) {
    console.log(e);
  }
}
const addUser = userData => {
  User.findOne(
    {
      email: userData.email,
    },
    (err, user) => {
      if (user) console.log('user exists');
      else new User(userData).save();
    },
  );
};

const getUser = email => {
  return User.find({
    email: email,
  });
};

const addUserLink = (newLink, email) => {
  User.findOne({
    email: email,
  })
    .then(res => res.links)
    .then(links => {
      if (!links.map(val => val.link).includes(newLink)) {
        User.update(
          {
            email: email,
          },
          {
            $push: {
              links: {
                link: newLink,
                price: 1221,
              },
            },
          },
          {
            runValidators: true,
          },
          function(err, raw) {
            if (err) return handleError(err);
            console.log('The raw response from Mongo was ', raw);
          },
        );
      } else console.log(`${newLink} is already exists`);
    })
    .catch(e => {
      console.error(e);
    });
};

const removeUserLink = (link, email) => {
  User.findOne({
    email: email,
  })
    .then(res => res.links)
    .then(links => {
      const newLinks = links.filter(val => val.link != link);
      User.update(
        {
          email: email,
        },
        {
          links: newLinks,
        },
        function(err, raw) {
          if (err) return handleError(err);
          console.log('The raw response from Mongo was ', raw);
        },
      );
    });
};

start();
User.collection.dropIndexes((err, res)=>{
  if(err)
    console.log(err)
  else {
    console.log(res)
  }
})
const checkChanges = require('./ChangeChecker/index')();

app.use(express.static(__dirname + '/../public'));

app.use('/', function(request, response) {
  response.sendFile(path.resolve(__dirname, '/../public/index.html'));
});
