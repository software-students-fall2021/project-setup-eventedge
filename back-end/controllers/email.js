const nodemailer = require('nodemailer');

const send = (req, res) => {
  console.log(req.body);
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'eventedge2023@gmail.com',
      pass: process.env.EMAILPASSWORD
    },
  });
  const mailOptions = {
    from: 'eventedge2023@gmail.com',
    to: `${req.body.from}, eventedge2023@gmail.com`,
    subject: req.body.subject,
    html: `<h2>From: ${req.body.from}</h2><br/><p>${req.body.message}</p>`,
  };
  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log(err);
      return res.status(400).json({error: 'Email is not able to send'});
    } else {
      console.log('Email sent: ' + info.response);
      return res.status(200).json(mailOptions);
    }
  });
};

module.exports = {
  send,
};
