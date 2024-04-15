require('dotenv').config();
const nodemailer = require('nodemailer');

// Function to send an email
const sendEmail = (receiverEmail, emailSubject, emailText = '', emailHTML = '') => {
    return new Promise((resolve, reject) => {
        // Create a transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS
            }
        });

        // Email options
        let mailOptions = {
            from: process.env.GMAIL_SENDER, // Sender address
            to: receiverEmail, // Receiver's email
            subject: emailSubject, // Subject line
            text: emailText, // Plain text body
            html: emailHTML // HTML body
        };

        // Send email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                reject(error); // Reject the Promise if there's an error
            } else {
                resolve(info); // Resolve the Promise with the info object
            }
        });
    });
}

module.exports = sendEmail;
