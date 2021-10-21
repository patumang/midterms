const nodemailer = require('nodemailer');
const mailGun = require('nodemailer-mailgun-transport');

const auth = {
    auth: {
      api_key: 'a84a195b9a497158863660f35bc94b32-2bf328a5-68063dd4',
      domain: 'sandbox4abfa3f71422448a9ceecbb0b048d2f0.mailgun.org'
    }
};

const transporter = nodemailer.createTransport(mailGun(auth));


const sendMail = (email, creatorName, uniqueUrl,) => {

  const mailOptions = {
    from: 'schoodle.midterm@gmail.com',
    to: email,
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
