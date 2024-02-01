const nodemailer = require('nodemailer')


exports.sendEmail = async (to, subject, text) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: "ahmedhaaji050@gmail.com",
            pass: "flgnvektitgvjzzx",
        },
    });

    const message = {
        from: `<ahmedhaaji050@gmail.com>`,
        to: to,
        subject: subject,
        html: text,
    };

    const info = await transporter.sendMail(message);

    console.log(`Message sent: ${info.messageId}`);



}