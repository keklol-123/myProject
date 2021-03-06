const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const SALT_ROUNDS = 10;

const user = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  tokens: {
      type :[{
          token: String
      }]
  },
  links: {
    type: [
      {
        link: {
          type: String,
          dropDups: true,
        },
        price: {
          type: String,
          required: true,
        },
        name: {
          type: String,
          default: 'Link',
        }
      },
    ],
    validate: {
      validator: function(array) {
        console.log(array);
        return array.map(val => val.link).length === new Set(array.map(val => val.link)).size;
      },
    },
  },
});



user.pre('save', function(next) {
  if (this.isNew || this.isModified('password')) {
    const document = this;
    bcrypt.hash(document.password, SALT_ROUNDS, function(err, hashedPassword) {
      if (err) {
        next(err);
      } else {
        document.password = hashedPassword;
        next();
      }
    });
  } else {
    next();
  }
});

user.methods.isCorrectPassword = function(password, callback) {
  bcrypt.compare(password, this.password, function(err, same) {
    if (err) {
      callback(err);
    } else {
      callback(err, same);
    }
  });
};



const User = mongoose.model('User', user);

module.exports = User;
