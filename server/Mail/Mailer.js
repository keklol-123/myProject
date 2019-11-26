const nodemailer = require('nodemailer');

const mailConfig = require('./config')

const transporter = nodemailer.createTransport(mailConfig)


const mailer = (recipientsMail, text) => {
    transporter.sendMail({
        from: mailConfig.auth.user,
          to: recipientsMail,
          subject: 'hello world!',
          text: text
        }, (err, info) => {
            if(err)
                console.log(err)
            else
                console.log(info)
        });
}

module.exports = mailer


