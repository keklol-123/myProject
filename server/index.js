const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const User = require('./UserScheme/User');
const changeChecker = require('./ChangeChecker')

const login = require('./api/routes/login');
const signup = require('./api/routes/signup');
const removeLink = require('./api/routes/removeLink');
const addLink = require('./api/routes/addLink');
const checkToken = require('./api/routes/checkToken');
const loadLinks = require('./api/routes/loadLinks')
require('events').EventEmitter.defaultMaxListeners = 0;


const app = express();

app.use(cookieParser());
app.use(bodyParser.json({
  type: ['application/json', 'text/plain']
}));
app.use(bodyParser.urlencoded({ extended: true }))

mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useCreateIndex', true);

app.use('/signup', signup);
app.use('/login', login);
app.use('/checkToken', checkToken);
app.use('/addlink', addLink);
app.use('/removelink', removeLink);
app.use('/loadlinks', loadLinks)
async function start() {
  try {
    await mongoose.connect(
      `mongodb://gleb:glebgleb@mypetdb-shard-00-00-mp6fc.mongodb.net:27017,mypetdb-shard-00-01-mp6fc.mongodb.net:27017,mypetdb-shard-00-02-mp6fc.mongodb.net:27017/test?ssl=true&replicaSet=myPetDB-shard-0&authSource=admin&retryWrites=true&w=majority`,
      err => {
        if (err) console.log(err);
        else console.log('Connected to DB');
      },
    );
    app.listen(process.env.PORT ||3000);
  } catch (e) {
    console.log(e);
  }
}

start();
User.collection.dropIndexes();
// const checkChanges = require('./ChangeChecker/index')();

setInterval(() => {

}, 10 * 60 * 1000)

app.use(express.static(__dirname + './../public'));

app.use('/', function(request, response) {
  response.sendFile(path.resolve(__dirname, '/../public/index.html'));
});
