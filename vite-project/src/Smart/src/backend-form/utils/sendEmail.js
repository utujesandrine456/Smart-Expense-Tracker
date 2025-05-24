const nodemailer = require('nodemailer');

 const sendVerificationEmail = async(email, code) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth:{
            user: 'tradewise.app@gmail.com',
            pass: 'tradewise456'
        },
    });

    await transporter.sendMail({
        from: '"TradeWise"  tradewise.app@gmail.com',
        to: email,
        subject: 'Email verification Code',
        html: `<p>Your vefication code is <strong>${code}</strong>. It expires in 15 seconds.</p>`,
    });
};

module.exports = {sendVerificationEmail};