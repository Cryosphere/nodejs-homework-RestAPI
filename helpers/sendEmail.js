const nodemailer = require("nodemailer");

const sendEmail = async (email, verificationToken) => {
  const emailTransport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const emailConfig = {
    from: "Contacts App Admin <admin.example.com>",
    to: email,
    subject: "Подтверждение email",
    html: ` <p>Please click the button below to verify your email address:</p><a target='_blanck' href='https://contacts-fh3s.onrender.com/users/verify/${verificationToken}'>Verify email</a>`,
  };

  await emailTransport
    .sendMail(emailConfig)
    .then(() => console.log("Email send success"))
    .catch((error) => console.log(error));
  return true;
};

module.exports = {
  sendEmail,
};
