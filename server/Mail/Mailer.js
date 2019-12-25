const nodemailer = require('nodemailer');
const mailConfig = require('./config')
const sgTransport = require('nodemailer-sendgrid-transport');
// const transporter = nodemailer.createTransport(mailConfig)

const mailTransporter = nodemailer.createTransport(sgTransport({
    auth: {
        api_key: process.env.ADMIN_EMAIL_API_KEY
    }
}))

const mailer = (recipientsMail, text) => {
    mailTransporter.sendMail({
          from: 'Price Watcher ',
          to: recipientsMail,
          replyTo: 'pricewachterio@gmail.com',
          subject: 'Price has changed',
          html: text
        }, (err, info) => {
            if(err)
                console.log(err)
            else
                console.log(info)
        });
}

module.exports = mailer;


