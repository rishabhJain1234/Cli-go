require('dotenv').config()
const Queue = require('bull');
const sendEmail = require('./sendEmail'); // Path to your sendEmail function file

// Create Bull queue instance
const emailQueue = new Queue('emailQueue', {
    redis:process.env.REDIS_URL
});

// Process function to handle email sending tasks
emailQueue.process(async (job) => {
    const { receiverEmail, emailSubject, emailText, emailHTML } = job.data;

    try {
        const info = await sendEmail(receiverEmail, emailSubject, emailText, emailHTML);
        console.log(`Email sent successfully to ${receiverEmail}: ${info.response}`);
        return info;
    } catch (error) {
        console.error(`Failed to send email to ${receiverEmail}: ${error}`);
        throw error;
    }
});

module.exports = emailQueue;