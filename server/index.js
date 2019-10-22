const express = require("express");
const mongoose = require("mongoose");
const path = require("path")

const User = require('./UserScheme/User')
const app = express();

mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);

async function start() {
    try {
        await mongoose.connect(`mongodb+srv://gleb:glebgleb@mypetdb-mp6fc.mongodb.net/test?retryWrites=true&w=majority`,
            (err) => {
                if (err)
                    console.log(err);
                else
                    console.log("Connected to DB");
            })
        app.listen(3000);

    } catch (e) {
        console.log(e)
    }
}

start()

const addUser = (userData) => {
    User.findOne({
        "email": userData.email
    }, (err, user) => {
        if (user)
            console.log("user exists");
        else
            new User(userData).save()
    })
}

const getUser = (email) => {
    return User.find({
        "email": email
    })
}



const addUserLink = (newLink, email) => {
    User.findOne({
            "email": email
        }).then(res => res.links)
        .then(links => {

            if (!links.map(val => val.link).includes(newLink)) {

                User.update({
                    "email": email
                }, {
                    $push: {
                        links: {
                            link: newLink,
                            price: 1221
                        }
                    }
                }, {
                    runValidators: true
                }, function (err, raw) {
                    if (err) return handleError(err);
                    console.log('The raw response from Mongo was ', raw)
                })
            } else
                console.log(`${newLink} is already exists`)
        }).catch(e => {
            console.error(e)
        })


}

const removeUserLink = (link, email) => {
    User.findOne({
            "email": email
        }).then(res => res.links)
        .then(links => {
            const newLinks = links.filter(val => val.link != link);
            User.update({
                "email": email
            }, {
                "links": newLinks
            }, function (err, raw) {
                if (err) return handleError(err);
                console.log('The raw response from Mongo was ', raw)
            })
        })
}

// addUser({
//     email: "keklol@gmail.com",
//     password: "123456",
//     links: [{
//             link: "kek.com",
//             price: 123
//         },

//         {
//             link: "asdfak.com",
//             price: 123
//         },

//     ]
// })


removeUserLink("kek.com", "keklol@gmail.com")
// removeUserLink("asdfak.com", "keklol@gmail.com")


addUserLink("new.com", "keklol@gmail.com")
addUserLink("new1.com", "keklol@gmail.com")
addUserLink("new2.com", "keklol@gmail.com")

removeUserLink("new.com", "keklol@gmail.com")

setTimeout(()=>removeUserLink("new1.com", "keklol@gmail.com"), 4000)
setTimeout(()=>removeUserLink("new2.com", "keklol@gmail.com"), 6000)





app.use(express.static(__dirname + "/../public"));

app.use("/", function (request, response) {

    response.sendFile(path.resolve(__dirname, '/../public/index.html'))
});