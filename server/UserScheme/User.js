const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
  links: {
    type: [
      {
        link: {
          type: String,
        },
        price: {
          type: String,
          required: true,
        },
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
