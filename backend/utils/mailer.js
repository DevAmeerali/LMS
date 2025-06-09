const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({ 
    service: 'Gmail',
    auth: {
        user: "ameerabro004@gmail.com",
        pass: "qsqy pdgl tdqp kwyn"  
    }
});

async function sendResetEmail(to, resetLink) {
    const mailOptions = {
        from: 'ameerabro004@gmail.com',
        to,
        subject: "Password reset request",
        html: `
            <p>You requested a password reset.</p>
            <p>Click <a href="${resetLink}">here</a> to reset your password.</p>
            <p>If you didn't request this, please ignore this email.</p>
        `
    };

    return transporter.sendMail(mailOptions);
}

module.exports = sendResetEmail;
