const nodemailer = require('nodemailer')

const send = (req, res) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'isfarox1@gmail.com',
            pass: 'Ir012789'
        }
    })
    const mailOptions = {
        from: 'isfarox1@gmail.com',
        to: 'isfaroshir@gmail.com',
        subject: 'Test',
        text: 'Test'
    }
    transporter.sendMail(mailOptions, function(err, info){
        if (err){
            console.log(err);
            res.json({'status': 'invalid'})
        } else{
            console.log('Email sent: '+ info.response);
            res.json({'status': 'success'})
        }
    })
}

module.exports = {
    send
};