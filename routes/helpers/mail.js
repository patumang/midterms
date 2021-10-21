require("dotenv").config();

const nodemailer = require('nodemailer');
const mailGun = require('nodemailer-mailgun-transport');

const auth = {
    auth: {
      api_key: process.env.API_KEY,
      domain: process.env.DOMAIN
    }
};

const transporter = nodemailer.createTransport(mailGun(auth));


const sendMail = (email, creatorName, uniqueUrl,) => {

  const mailOptions = {
    from: 'schoodle.midterm@gmail.com',
    to: 'schoodle.midterm@gmail.com',
    subject: 'Testing',
    text: `Hello ${creatorName}, your meeting url is localhost:8080/event/${uniqueUrl}`
  };

  transporter.sendMail(mailOptions, function(err, data) {
    if (err) {
      console.log(err)
      // cb(err, null);
    } else {
      console.log(data)
      // cb(null, data);
    }
  });

};

module.exports = sendMail;
