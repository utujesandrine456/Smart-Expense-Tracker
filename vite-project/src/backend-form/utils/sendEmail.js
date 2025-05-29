const nodemailer = require('nodemailer');

const sendVerificationEmail = async(email, code) => {
    try{
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER || 'sandrineuwas009@gmail.com',
                pass: process.env.EMAIL_APP_PASSWORD // Use App Password from Gmail
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        const mailOptions = {
            from: '"TradeWise" <tradewise.app@gmail.com>',
            to: email,
            subject: 'Email Verification Code',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #577F26;">Email Verification</h2>
                    <p>Your verification code is:</p>
                    <h1 style="color: #577F26; font-size: 32px; letter-spacing: 5px; padding: 20px; background: #f5f5f5; text-align: center; border-radius: 5px;">
                        ${code}
                    </h1>
                    <p>This code will expire in 15 minutes.</p>
                    <p>If you didn't request this code, please ignore this email.</p>
                </div>
            `
        };
    
        try {
            await transporter.sendMail(mailOptions);
            console.log('Verification email sent successfully');
        } catch (error) {
            console.error('Error sending verification email:', error);
            throw error;
        }
    }
    

    
};

module.exports = { sendVerificationEmail };